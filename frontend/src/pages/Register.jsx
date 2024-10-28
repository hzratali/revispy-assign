import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './styles/Register.css';
const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const registerUser = `${process.env.REACT_APP_BACKEND_URL}/api/users/register`
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(registerUser,formData);
      alert(response.data.message);
      navigate("/otp-verification", { state: { userId: response.data.userId } });
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  return (
    <div className="main-container">
    <div className="register-container">
      <h2>Create your account</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input 
          type="text" 
          id="name" 
          name="name" 
          placeholder="Enter Your Name" 
          onChange={handleChange} 
          required 
        />
        
        <label htmlFor="email">Email</label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          placeholder="Enter Your Email Address" 
          onChange={handleChange} 
          required 
        />
        
        <label htmlFor="password">Password</label>
        <input 
          type="password" 
          id="password" 
          name="password" 
          placeholder="Enter Your Password" 
          onChange={handleChange} 
          required 
        />
        
        <button type="submit">CREATE ACCOUNT</button>
      </form>
      
      <div className="login-link">
        Have an Account? <a href="/login">LOGIN</a>
      </div>
    </div>
    </div>
  );
};

export default Register;