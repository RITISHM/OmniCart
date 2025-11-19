import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../../services/api';
import './Signup.css';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState({
    minLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setError('');

    // Validate password as user types
    if (name === 'password') {
      setPasswordValidation({
        minLength: value.length >= 8,
        hasUpperCase: /[A-Z]/.test(value),
        hasLowerCase: /[a-z]/.test(value),
        hasNumber: /[0-9]/.test(value)
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Password validation
    if (!Object.values(passwordValidation).every(v => v)) {
      setError('Password does not meet requirements');
      return;
    }

    // Password match validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Call MongoDB API
      const data = await authAPI.register(formData.name, formData.email, formData.password);
      console.log('✅ Signup successful:', data);
      
      // Navigate to home page
      navigate('/');
    } catch (error) {
      console.error('❌ Signup error:', error);
      setError(error.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="container">
        <div className="auth-form-wrapper">
          <div className="auth-form">
            <h1>Create Account</h1>
            <p className="auth-subtitle">Join OmniCart today</p>
            
            {error && <div className="error-message">{error}</div>}
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required 
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input 
                  type="password" 
                  id="password" 
                  name="password" 
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  required 
                />
                {formData.password && (
                  <div className="password-requirements">
                    <p>Password must contain:</p>
                    <ul>
                      <li className={passwordValidation.minLength ? 'valid' : ''}>
                        At least 8 characters
                      </li>
                      <li className={passwordValidation.hasUpperCase ? 'valid' : ''}>
                        One uppercase letter
                      </li>
                      <li className={passwordValidation.hasLowerCase ? 'valid' : ''}>
                        One lowercase letter
                      </li>
                      <li className={passwordValidation.hasNumber ? 'valid' : ''}>
                        One number
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input 
                  type="password" 
                  id="confirmPassword" 
                  name="confirmPassword" 
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required 
                />
              </div>
              
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>
            
            <div className="auth-divider">
              <span>or</span>
            </div>

            <div className="social-login">
              <button className="btn-social btn-google">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
                  <path d="M9.003 18c2.43 0 4.467-.806 5.956-2.18L12.05 13.56c-.806.54-1.836.86-3.047.86-2.344 0-4.328-1.584-5.036-3.711H.96v2.332C2.44 15.983 5.485 18 9.003 18z" fill="#34A853"/>
                  <path d="M3.964 10.712c-.18-.54-.282-1.117-.282-1.71 0-.593.102-1.17.282-1.71V4.96H.957C.347 6.175 0 7.55 0 9.002c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                  <path d="M9.003 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.464.891 11.426 0 9.003 0 5.485 0 2.44 2.017.96 4.958L3.967 7.29c.708-2.127 2.692-3.71 5.036-3.71z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </button>
            </div>
            
            <p className="auth-switch">
              Already have an account? <Link to="/login">Login here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
