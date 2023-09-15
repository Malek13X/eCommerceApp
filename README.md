# eShop - MERN Stack E-commerce Web App

Welcome to eShop, an e-commerce web application built using the MERN stack. This project, created for educational purposes, leverages Redux Toolkit for API and state management, Tailwind CSS for styling, and Uploadcare to facilitate image handling, including product image storage in MongoDB as image URLs along with product info.


<img src='https://ucarecdn.com/e167eba5-e480-4ae9-9086-5bfd950bc70d/-/preview/1200x1200/-/quality/smart_retina/-/format/auto/' width='720' >
<img src='https://ucarecdn.com/e19afc3e-1034-4023-ae4a-27b53302b5e1/-/preview/1200x1200/-/quality/smart_retina/-/format/auto/' width='720' >
<img src='https://ucarecdn.com/c29d7df5-9a17-4ac4-a492-bd3ca29909cf/-/preview/1200x1200/-/quality/smart_retina/-/format/auto/' width='720' >
<img src='https://ucarecdn.com/15df9f70-b47b-4a49-a273-8ee922cacae5/-/preview/1200x1200/-/quality/smart_retina/-/format/auto/' width='720' >




## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Folder Structure](#folder-structure)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Introduction

eShop is an e-commerce web application designed to provide a seamless online shopping experience. It allows users to browse, search for products, add them to their cart, and place orders. Additionally, it offers user account management, including sign-in and sign-up functionality. For administrators, eShop provides an admin dashboard to manage products (add, delete, edit) and view order histories.

## Features

### User Authentication

- **Sign Up**: Users can create new accounts with a unique username and password.
- **Sign In**: Registered users can securely log in to their accounts.

### User Account Management

- **User Profile**: Users can view and update their profiles, including personal information and profile pictures.
- **Password Reset**: Forgot your password? Users can request a password reset email.

### Admin Dashboard

- **Add Products**: Administrators can add new products to the store, including product details and images.
- **Edit Products**: Admins have the ability to modify product details, such as name, description, price, and availability.
- **Delete Products**: Administrators can remove products from the store.

### Shopping Cart

- **Add to Cart**: Users can add products to their shopping cart.
- **Remove from Cart**: Remove items from the cart.
- **Update Cart**: Adjust the quantity of items in the cart.

### Order Management

- **Place Orders**: Users can place orders, which include selected products and shipping information.
- **Order History**: Users can view their order history and order details.

## Installation

To run the eShop project locally, follow these steps:

1. Clone this GitHub repository:

   ```bash
   git clone https://github.com/Malek13X/eShop.git
   
2. Navigate to the project directory:

   ```bash
   cd eShop
   
3. Install the project dependencies:

    ```bash
    npm install

    ```
    or

    ```bash
    yarn install

5. Set up environment variables:

  - Create a .env file in the root directory of the project.
  - Add the necessary environment variables, such as MongoDB connection string, API keys, and secret keys.

6. Start the development server:

    ```bash
    npm run server

    ```
    or

    ```bash
    yarn run server

7. Access the application in your web browser at http://localhost:3000.


## Folder Structure
The project's folder structure is organized as follows:

- **server**: Contains the back-end code.
- **client**: Contains the front-end code.
- **public**: Contains public assets and the HTML template.
- **uploads**: Stores uploaded images.
- **README.md**: The main documentation file you are currently reading.

## Technologies Used
This project is built with the following technologies:

- **MERN Stack**:
  - MongoDB
  - Express.js
  - React
  - Node.js
- **Redux Toolkit**: For efficient state management.
- **Redux Toolkit Query**: For handling API request  .
- **Tailwind CSS**: For styling and responsive design.
- **Uploadcare**: For handling and storing product image URLs in MongoDB.
- **authMiddleware**: For user authentication.
- **JWT**: JSON Web Tokens for secure user authentication.
- **Bcrypt**: For password hashing.


## License
This project is licensed under the MIT License.

Happy shopping! 🛒🛍️
