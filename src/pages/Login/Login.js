import './Login.css';

const Login = () => {
  return (
    <div className="login-page">
      <div className="container">
        <div className="login-form">
          <h1>Login / Sign Up</h1>
          <p>Welcome to OmniCart</p>
          
          <form>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" required />
            </div>
            
            <button type="submit" className="btn btn-primary">Login</button>
          </form>
          
          <p className="signup-link">
            Don't have an account? <a href="#signup">Sign up here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;