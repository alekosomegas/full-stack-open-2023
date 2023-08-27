const BlogForm = ({ handleNewBlog, newBlog, setNewBlog }) => {
  return (
    <form onSubmit={handleNewBlog}>
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
