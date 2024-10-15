## Project Overview

Welcome to **FlashGram**, a dynamic social media platform inspired by Instagram. This full-stack web application, built with React, Vite, Node.js, Express, and MongoDB, offers users ability to share images, interact with posts, and explore content in a visually appealing manner.

## Features

- **User Authentication**: Sign-up and login functionality with secure token-based authentication.
- **Profile Creation**: Users can upload a profile image during registration, allowing for a personalized touch right from the start.
- **Post Creation**: Users can create and share posts with images, allowing others to view and interact with them.
- **Image Uploads**: Supports uploading images to posts, enabling users to share their moments with the community.
- **Adding Comments**: Engage with posts by leaving comments, adding to the conversation.
- **Post Likes**: Show appreciation for posts by liking them, indicating your interest or support.
- **Profile Viewing**: Users can view their shared posts and personal information.
- **Saved Collections**: Users can access posts they have saved, making it easy to revisit favorite content.
- **User Search**: Users can search for other users.
- **Real-time Notifications**: Receive instant notifications for post comments using web socket communication.
- **Guest Mode**: Support for post creation, liking, and saving to collection using session storage for non-authenticated users.
- **Maintainable Styling**: Employs SCSS variables and mixins for consistent and easily manageable styles.

## Technologies Used

## Frontend

- **Core**: React with Vite as the build tool.
- **Styling**: SCSS (variables, mixins, nesting), and media queries for responsiveness.
- **State Management**: Redux for managing global application state.
- **Routing**: React Router for client-side routing.
- **Image Storage**: Cloudinary.
- **Network**: Axios for API requests (HTTP), WebSockets for real-time updates (TCP).
- **Utilities**: Debounce for search, EventBus for global event handling, Intersection Observer for infinite scroll.

## Backend

- **Server**: Node.js with Express.js for RESTful API development.
- **Database**: MongoDB Atlas.
- **Authentication**:
    - **Token-based** authentication system.
    - **Bcrypt** for secure password hashing.
- **Real-time Communication**: Socket.IO.
- **Request Parsing**: Cookie Parser for HTTP request cookie handling.
- **Environment Management**: Local .env (via dotenv) for development; production variables securely managed by hosting platform.
- **Other**: Custom logging, route splitting, aggregation pipelines, guest session storage.

## Architecture and Design
The project follows a modern adaptation of the **MVC (Model-View-Controller)** pattern, blending elements of **service-oriented architecture (SOA)** and **single-page application (SPA)** design. It emphasizes **Functional Programming**, leveraging **asynchronous promises** for smooth data handling and **React functional components with hooks** for state management and side effects.

The project is deployed on Render: [FlashGram Live Site](https://flashgram.onrender.com). Feel free to sign up or use the 'Continue as guest' feature to explore the app.
