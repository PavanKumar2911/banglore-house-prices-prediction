# Ticket Booking System 🎟️

This project is a comprehensive **Movie Ticket Booking System** with a separate frontend and backend designed to offer an intuitive and interactive booking experience for users.

🌐 **Live Demo**: [Movie Booking System](https://movie-booking-online.netlify.app/)

---

## 📋 Project Overview

This system allows users to:
- Browse available movies.
- Select showtimes and theaters.
- Book tickets with real-time seat availability.
- Manage bookings securely using JWT-based authentication.

It is built with a **React.js frontend** and a **Node.js + Express backend**, ensuring a robust and scalable platform for managing bookings and movie data.

---

## Frontend Repository

- **Repository**: [Frontend of Ticket Booking](https://github.com/Balaji-Sai-charan/frontend-of-ticketbooking)
- **Tech Stack**: React.js, CSS, and API requests (Axios).

### Features:
- **Responsive UI**: Seamless experience across desktop, tablet, and mobile devices.
- **Movie Display**: Displays available movies, showtimes, and theater details.
- **Booking Interface**: Allows users to select seats and view availability in real-time.
- **Dynamic Rendering**: Updates seat status, availability, and booking data interactively.
- **Modern Styling**: Clean and responsive design for better user experience.

---

## Backend Repository

- **Repository**: [Backend of Ticket Booking](https://github.com/Balaji-Sai-charan/backend-of-ticketbooking)
- **Tech Stack**: Node.js, Express.js, MongoDB, and Mongoose.

### Features:
- **RESTful API**: Provides endpoints to manage movies, showtimes, bookings, and user data.
- **Database Management**: Uses MongoDB for managing movies, seats, bookings, and users.
- **JWT Authentication**: Implements secure login and user session handling.
- **Seat Management**: Ensures no overbooking by dynamically updating seat availability.
- **Error Handling**: Robust error handling ensures a smooth user experience.

---

## 💻 How to Run Locally

### Prerequisites
- **Node.js** (>= 14.x)
- **MongoDB** server running locally or on the cloud.
- **npm** (Node Package Manager).

### Installation

#### Frontend Setup:
1. Clone the frontend repository:
   ```bash
   git clone https://github.com/Balaji-Sai-charan/frontend-of-ticketbooking.git
   ## 📂 Project Structure

### Frontend (`frontend-of-ticketbooking`)
- **`src/components/`**: Reusable UI components (e.g., MovieList, SeatSelector).
- **`src/pages/`**: Main application pages (e.g., Home, Booking).
- **`src/services/`**: Functions to handle API requests to the backend.

### Backend (`backend-of-ticketbooking`)
- **`controllers/`**: Contains business logic for handling routes.
- **`models/`**: Defines Mongoose schemas for Movies, Showtimes, Users, and Bookings.
- **`routes/`**: API routes to manage movies, bookings, and user actions.
- **`utils/`**: Utility functions for token generation, error management, etc.

---

## ✨ Future Enhancements

- **Payment Gateway Integration**: Add a secure payment system for ticket purchases.
- **Admin Dashboard**: Create an admin interface for managing movies, showtimes, and seats.
- **User Profiles**: Allow users to view booking history and update their personal information.
- **Analytics Dashboard**: Track booking trends and user interactions.
- **Dark Mode**: Introduce a dark mode theme for better usability.

