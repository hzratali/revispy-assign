import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles/Login.css';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate(); 

  const loginUser = `${process.env.REACT_APP_BACKEND_URL}/api/users/login`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    try {
      const { data } = await axios.post(loginUser, { email, password });
      localStorage.setItem('token', data.token);
      navigate('/'); 
    } catch (error) {
      setErrorMessage(error.response?.data?.error || "Login failed. Please check your credentials and try again.");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-container">
      <div className="login-container">
        <h2>Login</h2>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input 
            type="email" 
            placeholder="Enter your email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <label>Password</label>
          <input 
            type="password" 
            placeholder="Enter your password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <div className="login-link">
            <span>Don't have an account? <a href="/register">Register here</a></span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
