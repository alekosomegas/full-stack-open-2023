import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from './components/Notification'

const App = () => {
  const [message, setMessage] = useState({ text: '', error: false})
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
  });

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

  const handleNewBlog = async (event) => {
    event.preventDefault();

    const response = await blogService.create(newBlog, user)
    setBlogs(prev => prev.concat(response))
    setMessage({text: `a new blog: ${response.title} by ${response.author} added`, error: false})
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  return (
    <div>
      <Notification message={message} setMessage={setMessage}/>
      {user === null ? (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      ) : (
        <div>
          <h2>blogs</h2>
          <p>
            {`${user.name} logged in`}
            <button onClick={handleLogout}>Log out</button>
          </p>

          <BlogForm
            handleNewBlog={handleNewBlog}
            newBlog={newBlog}
            setNewBlog={setNewBlog}
          />

          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
