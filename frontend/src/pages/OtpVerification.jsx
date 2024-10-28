import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './styles/Otp.css';
import axios from "axios";

const OtpVerification = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const location = useLocation();
  const navigate = useNavigate();
  const userId = location.state?.userId;

  const verifyOtpUrl = `${process.env.REACT_APP_BACKEND_URL}/api/users/verify-otp`;

  const handleChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value; 
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }

    if (!value && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(verifyOtpUrl, { userId, otp: otp.join("") });
      alert(response.data.message);
      setOtp(["", "", "", "", "", ""]); 
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.error || "An error occurred. Please try again."); 
    }
  };

  return (
    <div className="main-container">
      <div className="verify-container">
        <h2>Enter OTP</h2>
        <p>Please enter the OTP sent to your registered email.</p>
        <form onSubmit={handleSubmit}>
          <div className="code-input">
            {otp.map((value, index) => (
              <input 
                key={index} 
                id={`otp-input-${index}`} 
                type="text" 
                maxLength="1" 
                value={value} 
                onChange={(e) => handleChange(index, e.target.value)} 
                required 
                aria-label={`OTP digit ${index + 1}`} 
              />
            ))}
          </div>
          <button type="submit">Verify OTP</button>
        </form>
      </div>
    </div>
  );
};

export default OtpVerification;
