# HatBazaar

This is a full-stack web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js) that provides a single-page interface for users to search, filter, categorize, sort, and paginate through a list of products. The application also includes authentication features using Firebase.

## Live Demo

[Live Website Link](https://hatbazaar-2c879.web.app/)

## Features

- **Product Listing**: Display a list of products with details including Product Name, Image, Description, Price, Category, Ratings, and Creation Date.
- **Pagination**: Efficient loading of products with navigation buttons (Next, Previous) and page numbers.
- **Search**: Find products by name using a search bar.
- **Categorization**: Filter products by Brand Name, Category, and Price Range.
- **Sorting**: Sort products by Price (Low to High, High to Low) and by Date Added (Newest first).
- **Authentication**: 
  - Google Authentication using Firebase.
  - Email and Password Authentication using Firebase.
- **Responsive UI**: Mobile-first design with fixed-size product cards, a Navbar, and a Footer.

## Technologies Used

- **Frontend**: React.js, CSS (or a CSS framework like Tailwind CSS)
- **Backend**: Node.js, Express.js, MongoDB (Mongoose for schema modeling)
- **Authentication**: Firebase Authentication
- **Deployment**: [Your hosting service]

## Installation

### Prerequisites

- Node.js
- MongoDB
- Firebase account for authentication setup

### Backend Setup

1. **Clone the Backend Repository:**

   ```bash
   git clone https://github.com/MamunKhan71/HatBazaar-Server.git

2. **Then Go to the directory:**
   ```bash
   cd HatBazaar-Server
3. **Open in visual Studio:**
   ```bash
   code .
4. **Run this Command in Terminal:**
   ```bash
   npm init
5. **Run the Server:**
   ```bash
   npm start
