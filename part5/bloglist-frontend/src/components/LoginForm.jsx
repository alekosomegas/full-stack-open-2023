const LoginForm = ({ handleLogin, username, setUsername, password, setPassword }) => {
  return (
    <form onSubmit={handleLogin}>
        <h1>log in to application</h1>
      <div>
        username
        <input
          type="text"
          id="username"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          id="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit" id="login-btn">login</button>
    </form>
  );
};

export default LoginForm