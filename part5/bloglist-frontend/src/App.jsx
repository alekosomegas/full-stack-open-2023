import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from './components/Notification'
import Togglable from "./components/Togglable";

const App = () => {
  const [message, setMessage] = useState({ text: '', error: false})
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const blogFormRef = useRef()

  const [createBlogFormVisible, setCreateBlogFormVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const userJson = localStorage.getItem("user");
    if(userJson) {
      const user = JSON.parse(userJson)
      setUser(user);
      blogService.setToken(user.token)
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      setUser(user);
      blogService.setToken(user.token)
      setUsername("");
      setPassword("");
      localStorage.setItem("user", JSON.stringify(user));
    } catch (exception) {
      console.log(exception);
      setMessage({text: 'wrong username or password', error: true})
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    setUser(null);
    blogService.setToken(null)
    localStorage.removeItem("user");
  };

  const createBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility()
    const response = await blogService.create(newBlog)
    response.user = user
    setBlogs(prev => prev.concat(response))
    setMessage({text: `a new blog: ${response.title} by ${response.author} added`, error: false})
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} setMessage={setMessage}/>
      {user === null ? (
        <Togglable buttonLabel='login'>
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
          />
        </Togglable>
      ) : (
        <div>
          <p>
            {`${user.name} logged in`}
            <button onClick={handleLogout}>Log out</button>
          </p>
          <Togglable buttonLabel='create new blog' ref={blogFormRef}>
            <BlogForm createBlog={createBlog}/>
          </Togglable>

        <div id="blogsContainer">

          {blogs.sort((a,b) => {return b.likes - a.likes}).map((blog) => (
            <Blog key={blog.id} blog={blog} setBlogs={setBlogs} username={user?.username} />
          ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
