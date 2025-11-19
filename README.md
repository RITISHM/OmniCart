# OmniCart - Gen Z Clothing Brand

A modern, full-stack e-commerce web application built with React.js and Node.js. OmniCart offers a seamless shopping experience with user authentication, dynamic product displays, and MongoDB integration.

## 🚀 Features

- **User Authentication**: Complete signup/login system with JWT tokens and MongoDB
- **User Profiles**: View and edit user information with secure authentication
- **Responsive Design**: Adapts perfectly to any device - desktop, tablet, or mobile
- **Dynamic Product Grid**: Interactive product displays with filtering and sorting
- **Product Collections**: Browse shirts, polos, and other clothing categories
- **Product Detail Pages**: Comprehensive product information with image galleries
- **Shopping Cart & Wishlist**: Add products to cart and wishlist (localStorage)
- **Contact Form**: Get in touch with the team
- **About Page**: Meet the team and learn about company values
- **Modern UI/UX**: Clean, Gen Z-focused design with smooth animations

## 🛠️ Tech Stack

### Frontend
- **React.js 18** - UI library
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API calls
- **CSS3** - Styling with CSS Variables
- **Google Fonts** - Inter & Montserrat typography

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### 1. Clone the repository
```bash
git clone <repository-url>
cd omnicart
```

### 2. Install Frontend Dependencies
```bash
npm install
```

### 3. Install Backend Dependencies
```bash
cd server
npm install
cd ..
```

### 4. Configure Environment Variables
Create a `.env` file in the `server` directory:
```env
MONGODB_URI=mongodb://localhost:27017/omnicart
PORT=5000
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

### 5. Start MongoDB
Make sure MongoDB is running on your system.

### 6. Seed Database (Optional)
```bash
cd server
npm run seed
```

### 7. Start the Backend Server
```bash
cd server
npm run dev
```
Server runs on: `http://localhost:5000`

### 8. Start the Frontend (in a new terminal)
```bash
npm start
```
Frontend runs on: `http://localhost:3000`

## 🏗️ Project Structure

```
omnicart/
├── src/                          # Frontend React application
│   ├── components/
│   │   ├── Header/              # Navigation header
│   │   └── Footer/              # Footer component
│   ├── pages/
│   │   ├── Home/                # Landing page
│   │   ├── ProductGrid/         # Product listing
│   │   ├── ProductDetail/       # Product details
│   │   ├── About/               # About us page
│   │   ├── Contact/             # Contact form
│   │   ├── Login/               # Login page
│   │   ├── Signup/              # Signup page
│   │   └── Profile/             # User profile
│   ├── services/
│   │   └── api.js               # API service layer
│   ├── data/
│   │   └── products.js          # Product data
│   ├── App.jsx                  # Main app component
│   └── index.js                 # Entry point
│
└── server/                       # Backend Node.js application
    ├── models/
    │   ├── User.js              # User schema
    │   ├── Product.js           # Product schema
    │   └── Order.js             # Order schema
    ├── routes/
    │   ├── auth.js              # Authentication routes
    │   ├── users.js             # User routes
    │   ├── products.js          # Product routes
    │   └── orders.js            # Order routes
    ├── middleware/
    │   └── auth.js              # JWT authentication
    ├── server.js                # Express server
    └── seed.js                  # Database seeding
```

## 🎨 Key Components

### Header Component
- Responsive navigation with mobile menu
- Active link highlighting
- Smooth scroll to sections

### Home Page
- Hero section with call-to-action
- Product collections showcase
- About section preview
- Features highlight
- Customer testimonials

### Product Grid
- Dynamic product loading
- Sorting and filtering options
- Grid/List view toggle
- Load more functionality
- Responsive product cards

### Product Detail
- Image gallery with thumbnails
- Size selection
- Quantity controls
- Add to cart/wishlist
- Related products
- Shipping information

### About Page
- Team member profiles
- Company story
- Core values
- Call-to-action section

### Contact Page
- Contact form with validation
- Company information
- Social media links
- Responsive layout

### Login Page
- Sign in/Sign up toggle
- Form validation
- Animated background
- Feature highlights

## 🎯 Available Scripts

### Frontend
- `npm start` - Runs the React app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner

### Backend
- `npm run dev` - Starts server with nodemon (auto-restart)
- `npm start` - Starts server in production mode
- `npm run seed` - Seeds database with sample data

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Users (Protected)
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Products
- `GET /api/products` - Get all products
- `GET /api/products?category=polos` - Filter by category
- `GET /api/products/:id` - Get product by ID

### Orders (Protected)
- `POST /api/orders` - Create new order
- `GET /api/orders/myorders` - Get user's orders
- `GET /api/orders/:id` - Get order by ID

## 🔐 Authentication

The app uses JWT (JSON Web Tokens) for authentication:
- Tokens are stored in localStorage
- Protected routes require valid token
- Automatic token refresh on page reload
- Secure password hashing with bcrypt

## 🌟 Features in Detail

### User Authentication System
- Complete signup/login flow
- JWT token-based authentication
- Password encryption with bcrypt
- Protected routes and API endpoints
- User profile management

### Product Management
- Dynamic product data from local storage
- Category-based filtering (Polos, Shirts)
- Product detail pages with images
- Size and quantity selection

### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Touch-friendly interactions
- Optimized for all screen sizes

## 🎨 Design System

### Colors
- Primary: #2c3e50
- Secondary: #34495e
- Accent: #e74c3c
- Background: #ffffff
- Light Background: #f8f9fa

### Typography
- Headers: Montserrat (400, 500, 600, 700, 800)
- Body: Inter (300, 400, 500, 600, 700)

### Spacing
- Consistent spacing scale
- Responsive breakpoints
- Grid-based layouts

## 🚀 Deployment

### Frontend Deployment (Netlify/Vercel)
1. Build the project: `npm run build`
2. Deploy the `build` folder
3. Configure redirects for React Router:
   ```
   /* /index.html 200
   ```

### Backend Deployment (Heroku/Railway)
1. Set environment variables
2. Deploy the `server` directory
3. Update frontend API URL in `src/services/api.js`

### Database
- Use MongoDB Atlas for cloud database
- Update `MONGODB_URI` in environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Team

- **Pratha Gupta** - UI/UX Designer
- **Pratham Garg** - Web Developer
- **Rutvi Juneja** - Web Developer
- **Ritish** - Source Code Manager

## 📞 Contact

- **Email**: OmniCartstyle@gmail.com
- **Location**: 123 Fashion Avenue, Rajpura, Punjab
- **Website**: [OmniCart](https://omnicart.netlify.app/)

---

**OmniCart** - Define Your Style. Express Your Vibe. 🛍️✨