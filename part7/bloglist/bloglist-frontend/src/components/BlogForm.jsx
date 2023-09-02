import { useState } from "react";

const BlogForm = ({ createBlog }) => {
    const [newBlog, setNewBlog] = useState({
        title: "",
        author: "",
        url: "",
      });

    const addBlog = (event) => {
        event.preventDefault();
        createBlog(newBlog)
        setNewBlog({
            title: "",
            author: "",
            url: "",
          })
    }

  return (
    <form onSubmit={addBlog}>
      <h1>create new</h1>
      <div>
        title:
        <input
          type="text"
          value={newBlog.title}
          name="title"
          onChange={({ target }) =>
            setNewBlog((prev) => {
              return {
                ...prev,
                title: target.value,
              };
            })
          }
        />
      </div>
      <div>
        author
        <input
          type="text"
          value={newBlog.author}
          name="author"
          onChange={({ target }) =>
            setNewBlog((prev) => {
              return {
                ...prev,
                author: target.value,
              };
            })
          }
        />
      </div>
      <div>
        url
        <input
          type="text"
          value={newBlog.url}
          name="url"
          onChange={({ target }) =>
            setNewBlog((prev) => {
              return {
                ...prev,
                url: target.value,
              };
            })
          }
        />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default BlogForm;
