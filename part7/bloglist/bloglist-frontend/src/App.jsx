import { useEffect, useRef } from "react";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from './components/Notification'
import Togglable from "./components/Togglable";
import { useDispatch } from "react-redux";
import BlogList from './components/BlogList' 
import { initializeBlogs } from "./reducers/blogReducer";
import { logOut, getUser } from "./reducers/userReducer";
import { useSelector } from 'react-redux'

const App = () => {
  const user = useSelector(state => state.user)
  const blogFormRef = useRef()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(getUser())
  }, []);

  const handleLogout = () => {
    dispatch(logOut())
  };

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      {user === null ? (
        <Togglable buttonLabel='login'>
          <LoginForm />
        </Togglable>
      ) : (
        <div>
          <p>
            {`${user.name} logged in`}
            <button onClick={handleLogout}>Log out</button>
          </p>
          <Togglable buttonLabel='create new blog' ref={blogFormRef}>
            <BlogForm />
          </Togglable>
          <BlogList />
        </div>
      )}
    </div>
  );
};

export default App;
