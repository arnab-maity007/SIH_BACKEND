const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { createServer } = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true
}));
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/trains', require('./routes/trains'));
app.use('/api/schedules', require('./routes/schedules'));
app.use('/api/optimization', require('./routes/optimization'));
app.use('/api/analytics', require('./routes/analytics'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Train Traffic Optimization API is running',
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'Train Traffic Optimization API',
    description: 'Smart India Hackathon - Railway Management System',
    version: '1.0.0',
    endpoints: [
      '/api/health',
      '/api/trains',
      '/api/schedules', 
      '/api/optimization',
      '/api/analytics'
    ]
  });
});

// Socket.IO for real-time updates
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  // Simulate real-time train updates
  const trainUpdateInterval = setInterval(() => {
    const mockUpdate = {
      trainId: `T00${Math.floor(Math.random() * 5) + 1}`,
      location: `Station-${Math.floor(Math.random() * 10) + 1}`,
      status: Math.random() > 0.8 ? 'Delayed' : 'On Time',
      timestamp: new Date().toISOString()
    };
    socket.emit('trainUpdate', mockUpdate);
  }, 5000);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
    clearInterval(trainUpdateInterval);
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!', 
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    message: `${req.method} ${req.originalUrl} is not a valid endpoint`
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`🚂 Train Traffic Optimization API running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});

module.exports = { app, server, io };