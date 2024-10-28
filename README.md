# Simple Categorization App with Authentication

## Overview

This project is a frontend task for creating a categorization app where users can sign up, log in, and mark categories they are interested in. It includes authentication, protected routes, and a category selection feature with pagination.

## Features

- **User Registration**: Users can register with a simple sign-up flow.
- **User Login**: Secure login functionality.
- **Protected Page**: Displays a paginated list of categories only to logged-in users.
- **Category Selection**: Users can mark categories they are interested in, with selections persisting across sessions.
- **Static Header**: Consistent, static header across all pages.

## Tech Stack

- **Frontend**: React
- **Backend**: Node
- **Database**: MongoDB
- **Data Generation**: Faker.js used to generate 100 category entries

## Screens

1. **User Registration Screens**: Two screens guiding new users through the sign-up process.
2. **User Login Screen**: A screen for existing users to log in.
3. **Protected Category Page**:
   - Displays categories fetched from the database.
   - Allows users to mark categories of interest.
   - Features pagination with six categories per page.

## Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/hzratali/revispy-assign.git
   cd revispy-assign
   ```

2. **Backend Setup**:

   - Navigate to the backend directory:
     ```bash
     cd backend
     ```
   - Set up environment variables in a `.env` file with necessary keys:

     ```bash
     PORT = 4000

     MONGO_DB_URI = 
 
     EMAIL_USER = 
 
     EMAIL_PASSWORD = 
 
     JWT_KEY = 
     ```

   - Install backend dependencies:
     ```bash
     npm install
     ```
   - Start the backend server:
     ```bash
     npm start
     ```

3. **Frontend Setup**:

   - Navigate to the frontend directory:
     ```bash
     cd ../frontend
     ```
   - Create a `.env` file in the frontend directory with:
     ```bash
     REACT_APP_BACKEND_URL = 'http://localhost:4000'
     ```
   - Install frontend dependencies:
     ```bash
     npm install
     ```
   - Start the frontend server:
     ```bash
     npm start
     ```

## Deployment

- **Frontend**: Deployed using Vercel or a similar hosting service.
- **Backend**: Hosted on Vercel or your preferred service.
---
