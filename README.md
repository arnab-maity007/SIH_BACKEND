# RailZenith Backend

> Advanced Railway Traffic Management System - Backend API

![RailZenith](https://img.shields.io/badge/RailZenith-Backend-orange?style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-green?style=for-the-badge&logo=node.js)
![Express](https://img.shields.io/badge/Express-black?style=for-the-badge&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-green?style=for-the-badge&logo=mongodb)

## 🚄 Overview

RailZenith Backend provides the core API services for the comprehensive railway traffic optimization and management system built for Smart India Hackathon. This backend handles real-time train data, schedule management, route optimization, and performance analytics.

## ✨ Features

- **🚂 Train Management**: CRUD operations for train data and status
- **📅 Schedule Management**: Departure/arrival times and platform assignments
- **🛤️ Route Optimization**: Advanced algorithms for efficient railway routing
- **📊 Real-time Analytics**: Performance metrics and system monitoring
- **🔄 Live Updates**: Socket.io integration for real-time data streaming
- **🏗️ RESTful API**: Clean and well-documented API endpoints
- **🔒 Data Validation**: Robust input validation and error handling

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Real-time**: Socket.io
- **Validation**: Express Validator
- **Environment**: dotenv
- **Deployment**: Railway/Vercel/Heroku

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or cloud)
- npm or yarn

### Installation

\`\`\`bash
# Clone the repository
git clone https://github.com/arnab-maity007/SIH_BACKEND.git

# Navigate to project directory
cd SIH_BACKEND

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start development server
npm run dev
\`\`\`

### Environment Variables

Create a \`.env\` file in the root directory:

\`\`\`env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/railzenith
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
\`\`\`

### Available Scripts

\`\`\`bash
npm start       # Start production server
npm run dev     # Start development server with nodemon
npm test        # Run tests
npm run lint    # Run ESLint
\`\`\`

## 📡 API Endpoints

### Train Management
\`\`\`
GET    /api/trains          # Get all trains
GET    /api/trains/:id      # Get specific train
POST   /api/trains          # Create new train
PUT    /api/trains/:id      # Update train
DELETE /api/trains/:id      # Delete train
\`\`\`

### Schedule Management
\`\`\`
GET    /api/schedules       # Get all schedules
GET    /api/schedules/:id   # Get specific schedule
POST   /api/schedules       # Create new schedule
PUT    /api/schedules/:id   # Update schedule
DELETE /api/schedules/:id   # Delete schedule
\`\`\`

### Route Optimization
\`\`\`
GET    /api/routes          # Get all routes
POST   /api/routes/optimize # Optimize route
GET    /api/routes/:id      # Get specific route
\`\`\`

### Analytics & Monitoring
\`\`\`
GET    /api/analytics/performance  # Get performance metrics
GET    /api/analytics/delays       # Get delay statistics
GET    /api/analytics/occupancy    # Get occupancy data
GET    /api/health                 # Health check endpoint
\`\`\`

## 📁 Project Structure

\`\`\`
├── models/
│   ├── Train.js           # Train data model
│   ├── Schedule.js        # Schedule data model
│   └── Route.js           # Route data model
├── routes/
│   ├── trains.js          # Train API routes
│   ├── schedules.js       # Schedule API routes
│   ├── routes.js          # Route optimization routes
│   └── analytics.js       # Analytics routes
├── middleware/
│   ├── auth.js           # Authentication middleware
│   ├── validation.js     # Input validation
│   └── errorHandler.js   # Error handling
├── utils/
│   ├── database.js       # Database connection
│   └── optimization.js   # Route optimization algorithms
├── server.js             # Main server file
└── package.json          # Dependencies and scripts
\`\`\`

## 🗄️ Database Schema

### Train Model
\`\`\`javascript
{
  id: String,
  name: String,
  route: String,
  status: String,
  currentLocation: String,
  nextStation: String,
  speed: Number,
  capacity: Number,
  occupancy: Number,
  delay: Number,
  type: String,
  platform: String,
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

### Schedule Model
\`\`\`javascript
{
  id: String,
  trainId: String,
  departure: String,
  arrival: String,
  route: String,
  platform: String,
  status: String,
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

## 🔄 Real-time Features

The backend supports real-time updates through Socket.io:

- **Train Status Updates**: Live train location and status changes
- **Schedule Changes**: Real-time schedule modifications
- **Delay Notifications**: Instant delay alerts
- **System Alerts**: Critical system notifications

## 🚀 Deployment

### Railway (Recommended)
\`\`\`bash
# Deploy to Railway
railway login
railway init
railway up
\`\`\`

### Vercel
\`\`\`bash
# Deploy to Vercel
npm run build
vercel --prod
\`\`\`

### Heroku
\`\`\`bash
# Deploy to Heroku
heroku create railzenith-backend
git push heroku main
\`\`\`

## 🔒 Security Features

- **Input Validation**: All inputs are validated and sanitized
- **Error Handling**: Comprehensive error handling and logging
- **CORS Configuration**: Configurable CORS settings
- **Rate Limiting**: API rate limiting for stability
- **Environment Variables**: Secure configuration management

## 🧪 Testing

\`\`\`bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- --grep "Train API"
\`\`\`

## 📊 Monitoring & Analytics

The backend provides comprehensive analytics:

- **Performance Metrics**: Response times, throughput
- **Train Analytics**: On-time performance, delay patterns
- **System Health**: Server status, database connections
- **Usage Statistics**: API endpoint usage

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

## 📄 License

This project is part of Smart India Hackathon 2024 submission.

## 🔗 Related Repositories

- [SIH_FRONTEND](https://github.com/arnab-maity007/SIH_FRONTEND) - Frontend Application
- [SIH](https://github.com/arnab-maity007/SIH) - Complete Project

## 📞 Support

For questions and support, please open an issue in the GitHub repository.

---

**Built with ❤️ for Smart India Hackathon 2024**
