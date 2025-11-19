# OmniCart - Gen Z Clothing Brand 🛍️

A modern, full-stack e-commerce web application built with React 18, Vite, and Node.js. OmniCart delivers a lightning-fast shopping experience with user authentication, dynamic product displays, toast notifications, and MongoDB integration.

## 🚀 Features

- **User Authentication**: Complete signup/login system with JWT tokens and MongoDB
- **User Profiles**: View and edit user information with secure authentication
- **Responsive Design**: Adapts perfectly to any device - desktop, tablet, or mobile
- **Dynamic Product Grid**: Interactive product displays with filtering and sorting
- **Product Collections**: Browse shirts, polos, and other clothing categories
- **Product Detail Pages**: Comprehensive product information with image galleries
- **Shopping Cart**: Full-featured cart with quantity controls, promo codes, and real-time updates
- **Checkout System**: Complete checkout flow with COD, Card, and UPI payment options
- **Toast Notifications**: Beautiful, non-intrusive notifications for user actions
- **Contact Form**: Get in touch with the team
- **About Page**: Meet the team and learn about company values
- **Modern UI/UX**: Clean, Gen Z-focused design with smooth animations and instant feedback

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **Vite 5** - Lightning-fast build tool with instant HMR
- **React Router DOM v6** - Client-side routing
- **Axios** - HTTP client for API calls
- **CSS3** - Custom styling with CSS Variables
- **Context API** - Global state management for toast notifications
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

> **Note**: This project uses Vite for blazing fast development with instant HMR and optimized builds.

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
npm run dev
```
Frontend runs on: `http://localhost:3000`

## 🏗️ Project Structure

```
omnicart/
├── src/                          # Frontend React application
│   ├── components/
│   │   ├── Header/              # Navigation header with cart badge
│   │   ├── Footer/              # Footer component
│   │   └── Toast/               # Toast notification system
│   ├── pages/
│   │   ├── Home/                # Landing page
│   │   ├── ProductGrid/         # Product listing
│   │   ├── ProductDetail/       # Product details
│   │   ├── Cart/                # Shopping cart
│   │   ├── Checkout/            # Checkout page
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
│   ├── main.jsx                 # Vite entry point
│   └── index.css                # Global styles
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

### Cart & Checkout
- Shopping cart with localStorage persistence
- Quantity controls and item removal
- Promo code support (OMNI10, WELCOME20)
- Multi-step checkout with form validation
- Multiple payment methods (COD, Card, UPI)
- Order summary with real-time calculations

### Toast Notification System
- Success, error, warning, and info notifications
- Auto-dismiss with customizable duration
- Stacked notifications support
- Smooth animations and transitions
- Mobile-responsive design

## 🎯 Available Scripts

### Frontend
- `npm run dev` - Runs the React app in development mode with Vite
- `npm run build` - Builds the app for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

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

## ⚡ Why Vite?

This project uses Vite instead of Create React App for:
- **Instant Server Start**: No bundling required in development
- **Lightning Fast HMR**: Changes reflect instantly
- **Optimized Builds**: Better production bundles with Rollup
- **Modern by Default**: Native ES modules support
- **Better DX**: Improved developer experience

## 🚀 Deployment

### Frontend Deployment (Netlify/Vercel)
1. Build the project: `npm run build`
2. Deploy the `build` folder (or `dist` if not configured)
3. Configure redirects for React Router:
   ```
   /* /index.html 200
   ```
4. Set environment variable: `VITE_API_URL=your-backend-url`

### Backend Deployment (Heroku/Railway)
1. Set environment variables
2. Deploy the `server` directory
3. Update frontend API URL in `.env`

### Database
- Use MongoDB Atlas for cloud database
- Update `MONGODB_URI` in environment variables

## 🔧 Environment Variables

### Frontend (.env in root)
```env
VITE_API_URL=http://localhost:5000/api
```

### Backend (.env in server/)
```env
MONGODB_URI=mongodb://localhost:27017/omnicart
PORT=5000
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 🎁 Promo Codes

Try these promo codes at checkout:
- **OMNI10** - 10% discount
- **WELCOME20** - 20% discount

## 📄 License

This project is licensed under the MIT License.

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