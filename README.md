# Train Traffic Optimization System - SIH 2025

A comprehensive Train Traffic Optimization system built for Smart India Hackathon 2025.

## 🚂 Features

- **Real-time Train Tracking**: Live monitoring of train positions and status
- **Route Optimization**: AI-powered route planning and optimization algorithms
- **Schedule Management**: Comprehensive schedule planning and management
- **Traffic Coordination**: Advanced traffic coordination and conflict resolution
- **Performance Analytics**: Real-time analytics and reporting dashboard
- **Responsive UI**: Modern, responsive interface built with Next.js and Tailwind CSS

## 🛠️ Tech Stack

### Frontend
- **Next.js 15.5.3** - React framework with App Router
- **React 19** - Component library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling framework
- **Axios** - API client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **Socket.io** - Real-time communication
- **Helmet** - Security middleware

## 📁 Project Structure

```
SIH_CRAZY/
├── frontend/           # Next.js React application
│   ├── src/
│   │   ├── app/       # App Router pages
│   │   ├── components/ # React components
│   │   ├── services/  # API services
│   │   └── types/     # TypeScript types
│   └── package.json
├── backend/           # Node.js Express API
│   ├── models/       # Database models
│   ├── routes/       # API routes
│   ├── middleware/   # Express middleware
│   └── server.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- MongoDB (local or cloud)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/arnab-maity007/SIH.git
   cd SIH
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd ../backend
   npm install
   ```

4. **Environment Setup**
   
   Create `.env` file in backend directory:
   ```env
   PORT=5001
   MONGODB_URI=mongodb://localhost:27017/train_optimization
   NODE_ENV=development
   JWT_SECRET=your_jwt_secret_here
   ```

### Running the Application

1. **Start Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   Backend will run on `http://localhost:5001`

2. **Start Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend will run on `http://localhost:3000`

## 📊 API Endpoints

### Train Management
- `GET /api/trains` - Get all trains
- `POST /api/trains` - Create new train
- `PUT /api/trains/:id` - Update train
- `DELETE /api/trains/:id` - Delete train

### Schedule Management  
- `GET /api/schedules` - Get all schedules
- `POST /api/schedules` - Create new schedule
- `PUT /api/schedules/:id` - Update schedule
- `DELETE /api/schedules/:id` - Delete schedule

### Route Optimization
- `POST /api/optimization/route` - Optimize route
- `GET /api/optimization/history` - Get optimization history

### Analytics
- `GET /api/analytics/dashboard` - Get dashboard analytics
- `GET /api/analytics/performance` - Get performance metrics
- `POST /api/analytics/custom-report` - Generate custom report

## 🌟 Key Components

### Frontend Components
- **Dashboard**: Main analytics and overview dashboard
- **TrainTracking**: Real-time train tracking interface
- **ScheduleManagement**: Schedule CRUD operations
- **RouteOptimization**: Route planning and optimization
- **Sidebar**: Navigation component

### Backend Services
- **Train Service**: Train lifecycle management
- **Schedule Service**: Schedule management
- **Optimization Service**: Route optimization algorithms
- **Analytics Service**: Reporting and analytics

## 🔧 Development

### Code Quality
- ESLint configuration for code quality
- TypeScript for type safety
- Prettier for code formatting

### Testing
```bash
# Run frontend tests
cd frontend && npm test

# Run backend tests  
cd backend && npm test
```

### Building for Production
```bash
# Build frontend
cd frontend && npm run build

# Build backend
cd backend && npm run build
```

## 🚀 Deployment

### Frontend (Vercel)
1. Connect GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push to main

### Backend (Railway/Render)
1. Connect GitHub repository to hosting platform
2. Configure environment variables
3. Set up MongoDB Atlas for production database

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is developed for Smart India Hackathon 2025.

## 👥 Team

- **Lead Developer**: [Your Name]
- **Project**: Train Traffic Optimization System
- **Event**: Smart India Hackathon 2025

## 🙏 Acknowledgments

- Smart India Hackathon organizers
- Railway domain experts
- Open source community

---

**Built with ❤️ for Smart India Hackathon 2025**