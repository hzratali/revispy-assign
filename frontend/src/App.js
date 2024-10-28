import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import OtpVerification from "./pages/OtpVerification";
import Login from './pages/Login';
import Header from "./components/Header";
import Category from "./pages/Category";
import Logout from "./pages/Logout";

function App() {
  const token = localStorage.getItem('token');
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/otp-verification" element={<OtpVerification />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/" element={token ? <Category /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
