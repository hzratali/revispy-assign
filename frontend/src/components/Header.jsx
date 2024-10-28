import React from 'react';
import { jwtDecode } from 'jwt-decode';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Header.css';

const Header = () => {
    const token = localStorage.getItem('token');
    let userName = 'Guest'; 
    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            console.log(decodedToken);
            userName = decodedToken.name || 'John'; 
        } catch (error) {
            console.error("Error decoding token", error);
        }
    }

    return (
        <header className="header">
            <div className="top-bar">
                <span>Help</span>
                <span>Orders & Returns</span>
                <span>Hi, {userName}</span>
            </div>
            <div className="main-bar">
                <h1 className="logo">ECOMMERCE</h1>
                <nav className="nav-links">
                    <a href="#categories">Categories</a>
                    <a href="#sale">Sale</a>
                    <a href="#clearance">Clearance</a>
                    <a href="#new-stock">New stock</a>
                    <a href="#trending">Trending</a>
                </nav>
                <div className="icons">
                    <span className="icon search-icon"><i className="fas fa-search"></i></span>
                    <span className="icon cart-icon"><i className="fas fa-shopping-cart"></i></span>
                </div>
            </div>
            <div className="promo-bar">
                <span>&lt;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Get 10% off on business sign up&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&gt;</span>
            </div>
        </header>
    );
};

export default Header;
