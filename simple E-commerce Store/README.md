# Simple E-commerce Store

A full-stack e-commerce application built with Node.js/Express.js backend and HTML/CSS/JavaScript frontend.

## Features

- User registration and login
- Product listings and details
- Shopping cart functionality
- Order processing
- Responsive design

## Tech Stack

### Backend
- Node.js
- Express.js
- PostgreSQL with Sequelize ORM
- JSON Web Tokens (JWT) for authentication
- bcryptjs for password hashing

### Frontend
- HTML5
- CSS3
- JavaScript (ES6+)

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (local installation or remote database)

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Install backend dependencies:
   ```
   cd backend
   npm install
   ```

3. Install frontend dependencies (if any):
   ```
   cd ../frontend
   # No npm dependencies for frontend in this project
   ```

4. Create a `.env` file in the backend directory:
   ```
   PORT=5000
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=ecommerce
   DB_USER=postgres
   DB_PASSWORD=your_postgres_password
   JWT_SECRET=your_jwt_secret_key_here
   ```

5. Create the database in PostgreSQL:
   ```sql
   CREATE DATABASE ecommerce;
   ```

## Running the Application

1. Start PostgreSQL database

2. Start the backend server:
   ```
   cd backend
   npm run dev
   ```

3. Seed the database with sample products (optional):
   ```
   npm run seed
   ```

4. Open the frontend files in your browser:
   - Open `frontend/index.html` in your browser

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get a single product
- `POST /api/products` - Create a new product (admin only)
- `PUT /api/products/:id` - Update a product (admin only)
- `DELETE /api/products/:id` - Delete a product (admin only)

### Cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update cart item quantity
- `DELETE /api/cart/remove/:productId` - Remove item from cart

### Orders
- `POST /api/orders` - Create a new order
- `GET /api/orders` - Get all orders for the authenticated user
- `GET /api/orders/:id` - Get order by ID
- `PUT /api/orders/:id/status` - Update order status (admin only)

## Project Structure

```
simple-e-commerce-store/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── models/
│   │   ├── index.js
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Order.js
│   │   └── OrderItem.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── products.js
│   │   ├── orders.js
│   │   └── cart.js
│   ├── middleware/
│   │   └── auth.js
│   ├── .env
│   ├── server.js
│   ├── seed.js
│   └── package.json
└── frontend/
    ├── index.html
    ├── products.html
    ├── product.html
    ├── cart.html
    ├── login.html
    ├── register.html
    ├── styles.css
    └── script.js
```

## Usage

1. Register a new account or login with existing credentials
2. Browse products on the home or products page
3. Click on a product to view details
4. Add products to your cart
5. Proceed to checkout from the cart page
6. Place your order

## Development

To modify the application:

1. Backend changes:
   - Modify files in the `backend/` directory
   - The server will automatically restart with nodemon during development

2. Frontend changes:
   - Modify HTML, CSS, and JavaScript files in the `frontend/` directory
   - Refresh the browser to see changes

## License

This project is licensed under the MIT License.