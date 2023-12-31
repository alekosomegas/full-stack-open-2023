const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const User = require('./models/user')
const { GraphQLError } = require('graphql')

const { expressMiddleware } = require('@apollo/server/express4')
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const express = require('express')
const cors = require('cors')
const http = require('http')

const { WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/lib/use/ws')

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

mongoose.set('strictQuery', false)

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })


const typeDefs = `
  type Author {
    name: String!
    id: ID!
    born: Int
	bookCount: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String]!
  }

  type User {
	username: String!
	favoriteGenre: String!
	id: ID!
  }
  
  type Token {
	value: String!
  }
  
  type Query {
    authorsCount: Int!
    allAuthors: [Author!]!

    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
	allBooksByGenre(genre: String): [Book]!

	me: User

	allGenres: [String!]!
  }

  type Mutation {
	addBook(
		title: String!
		published: Int!
		author: String!
		genres: [String!]!
	) : Book!

	editAuthor(
		name: String!
		setBornTo: Int!
	) : Author

	createUser(
		username: String!
		favoriteGenre: String!
	  ): User

	  login(
		username: String!
	  ): Token
  }
`

const resolvers = {
	Query: {
		authorsCount: async () => Author.collection.countDocuments(),
		allAuthors: async () => {
			const authors = await Author.find({})
			return authors
		},

		allGenres: async () => {
			const books = await Book.find({})
			let allGenres = []
			books.forEach(b => allGenres.push(...b.genres))
			allGenres = allGenres.filter((book, i, arr) => arr.indexOf(book) === i)
			return allGenres
		},

		bookCount: async () => Book.collection.countDocuments(),

		allBooks: async (root, args, contextValue) => {
			const byAuthor = book => args.author ? book.author.name === args.author : book
			const byGenre  = book => args.genre && args.genre != 'all genres' ? book.genres.includes(args.genre) : book
			const books = (await Book.find({}).populate('author')).filter(byGenre)
			return books
		},

		allBooksByGenre: async (root, args, contextValue) => {
			console.log(args);
			const byGenre  = book => args.genre && args.genre != 'all genres' ? book.genres.includes(args.genre) : book
			const books = (await Book.find({}).populate('author')).filter(byGenre)
			console.log(books);
			return books
		},


		me: (root, args, context) => {
			return context.currentUser
		}
	},

	Mutation: {
		addBook: async (root, args, context) => {
			const currentUser = context.currentUser

			if (!currentUser) {
			  throw new GraphQLError('not authenticated', {
				extensions: {
				  code: 'BAD_USER_INPUT',
				}
			  })
			}

			let author = await Author.find({name: args.author})
			if (!author.length) {
				author = new Author({name: args.author})
				await author.save()
			}

			const book = new Book({...args, author: author._id })
			try {
				await book.save()

			} catch (error) {
				throw new GraphQLError('Saving user failed', {
				  extensions: {
					code: 'BAD_USER_INPUT',
					invalidArgs: args.name,
					error
				  }
				})
			  }

			  pubsub.publish('BOOK_ADDED', { bookAdded: book })

			return book
		},
		Subscription: {
			bookAdded: {
			  subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
			},
		},


		editAuthor: async (root, args) => {
			const author = await Author.findOne({name: args.name})
			if (!author) {
				return null
			}
			author.born = args.setBornTo 
			await author.save()
			return author
		},

		createUser: async (root, args) => {
			const user = new User({ username: args.username })
		
			return user.save()
			  .catch(error => {
				throw new GraphQLError('Creating the user failed', {
				  extensions: {
					code: 'BAD_USER_INPUT',
					invalidArgs: args.name,
					error
				  }
				})
			  })
		  },

		  login: async (root, args) => {
			const user = await User.findOne({ username: args.username })
		
			if ( !user ) {
			  throw new GraphQLError('wrong credentials', {
				extensions: {
				  code: 'BAD_USER_INPUT'
				}
			  })        
			}
		
			const userForToken = {
			  username: user.username,
			  id: user._id,
			}
		
			return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
		  },
	},


	Author: {
		name: (root) => root.name,
		bookCount: async (root) => {
			const books = await Book.find({}).populate('author')
			return books.reduce((acc, cur) => {
				return cur.author.name === root.name ? acc +1: acc
			}, 0)
		}
	},
	User: {
		favoriteGenre: (root) => root.favoriteGenre[0]
	}
}

const server = new ApolloServer({
	typeDefs,
	resolvers,
})



const start = async () => {
	const app = express()
	const httpServer = http.createServer(app)
  
	const wsServer = new WebSocketServer({
	  server: httpServer,
	  path: '/',
	})
	
	const schema = makeExecutableSchema({ typeDefs, resolvers })
	const serverCleanup = useServer({ schema }, wsServer)
  
	const server = new ApolloServer({
	  schema,
	  plugins: [
		ApolloServerPluginDrainHttpServer({ httpServer }),
		{
		  async serverWillStart() {
			return {
			  async drainServer() {
				await serverCleanup.dispose();
			  },
			};
		  },
		},
	  ],
	})
  
	await server.start()
  
	app.use(
	  '/',
	  cors(),
	  express.json(),
	  expressMiddleware(server, {
		context: async ({ req }) => {
		  const auth = req ? req.headers.authorization : null
		  if (auth && auth.startsWith('Bearer ')) {
			const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
			const currentUser = await User.findById(decodedToken.id).populate('favoriteGenre')
			return { currentUser }
		  }
		},
	  }),
	)
  
	const PORT = 4000
  
	httpServer.listen(PORT, () =>
	  console.log(`Server is now running on http://localhost:${PORT}`)
	)
  }
  
  start()


// startStandaloneServer(server, {
// 	listen: { port: 4000 },
// 	context: async ({ req, res }) => {
// 		const auth = req ? req.headers.authorization : null
// 		if (auth && auth.startsWith('Bearer ')) {
// 		  const decodedToken = jwt.verify(
// 			auth.substring(7), process.env.JWT_SECRET
// 		  )
// 		  const currentUser = await User
// 			.findById(decodedToken.id).populate('favoriteGenre')
// 			return { currentUser }
// 		}
// 	},
// }).then(({ url }) => {
// 	console.log(`Server ready at ${url}`)
// })
