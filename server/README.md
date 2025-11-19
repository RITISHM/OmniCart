# OmniCart Backend Server

Express.js + MongoDB backend for OmniCart e-commerce application with JWT authentication.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Create a `.env` file in the server directory:

```env
MONGODB_URI=mongodb://localhost:27017/omnicart
PORT=5000
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

**For MongoDB Atlas (Cloud):**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/omnicart
```

### 3. Start MongoDB
Ensure MongoDB is running on your system.

### 4. Seed Database (Optional)
```bash
npm run seed
```

### 5. Start Server
```bash
npm run dev
```

Server runs on: http://localhost:5000

## 📁 Project Structure

```
server/
├── models/
│   ├── User.js              # User schema with password hashing
│   ├── Product.js           # Product schema
│   └── Order.js             # Order schema
├── routes/
│   ├── auth.js              # Register & login endpoints
│   ├── users.js             # User profile endpoints
│   ├── products.js          # Product CRUD endpoints
│   └── orders.js            # Order management endpoints
├── middleware/
│   └── auth.js              # JWT verification middleware
├── server.js                # Main Express application
├── seed.js                  # Database seeding script
└── .env                     # Environment variables
```

## 🔌 API Endpoints

### Authentication
```
POST /api/auth/register
Body: { name, email, password }
Response: { token, user }

POST /api/auth/login
Body: { email, password }
Response: { token, user }
```

### Users (Protected)
```
GET /api/users/profile
Headers: { Authorization: Bearer <token> }
Response: { user }

PUT /api/users/profile
Headers: { Authorization: Bearer <token> }
Body: { name, email, phone, address }
Response: { user }
```

### Products
```
GET /api/products
Query: ?category=polos&sort=price-low
Response: [products]

GET /api/products/:id
Response: { product }

GET /api/products/search?q=shirt
Response: [products]
```

### Orders (Protected)
```
POST /api/orders
Headers: { Authorization: Bearer <token> }
Body: { items, totalAmount, shippingAddress }
Response: { order }

GET /api/orders/myorders
Headers: { Authorization: Bearer <token> }
Response: [orders]

GET /api/orders/:id
Headers: { Authorization: Bearer <token> }
Response: { order }
```

## 🔐 Authentication

Protected routes require JWT token in Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

Tokens are generated on login/register and expire in 30 days.

## 📝 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/omnicart` |
| `PORT` | Server port | `5000` |
| `JWT_SECRET` | Secret key for JWT tokens | `your_secret_key_here` |
| `NODE_ENV` | Environment mode | `development` or `production` |

## 🛠️ Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start server in production mode |
| `npm run dev` | Start with nodemon (auto-restart on changes) |
| `npm run seed` | Seed database with sample data |

## 🗄️ Database Models

### User Model
- name, email, password (hashed)
- phone, address
- createdAt, updatedAt

### Product Model
- name, description, price
- category, sizes, colors
- images, stock
- createdAt, updatedAt

### Order Model
- user reference
- items (product, quantity, price)
- totalAmount, status
- shippingAddress
- createdAt, updatedAt

## 🔧 Technologies Used

- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin requests
- **dotenv** - Environment variables

## 📞 Support

For issues or questions, contact the development team.
