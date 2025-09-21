const express = require('express');
const router = express.Router();

// Mock data for development (replace with database queries)
const mockTrains = [
  {
    id: 'T001',
    trainId: 'T001',
    name: 'Express 101',
    type: 'Express',
    route: {
      origin: 'Delhi',
      destination: 'Mumbai',
      intermediateStations: [
        { stationName: 'Gwalior', arrivalTime: '12:30', departureTime: '12:35', platform: '2' },
        { stationName: 'Bhopal', arrivalTime: '15:45', departureTime: '15:50', platform: '1' },
        { stationName: 'Nagpur', arrivalTime: '20:15', departureTime: '20:20', platform: '3' }
      ]
    },
    currentStatus: {
      status: 'On Time',
      currentLocation: 'Gwalior',
      nextStation: 'Bhopal',
      delay: 0,
      lastUpdated: new Date()
    },
    capacity: {
      totalSeats: 500,
      occupiedSeats: 420,
      waitingList: 15
    },
    operationalData: {
      speed: 120,
      fuelLevel: 85,
      engineHealth: 'Good',
      lastMaintenance: new Date('2024-01-15')
    }
  },
  {
    id: 'T002',
    trainId: 'T002',
    name: 'Rajdhani Express',
    type: 'Express',
    route: {
      origin: 'Delhi',
      destination: 'Chennai',
      intermediateStations: [
        { stationName: 'Nagpur', arrivalTime: '08:30', departureTime: '08:35', platform: '1' },
        { stationName: 'Hyderabad', arrivalTime: '14:45', departureTime: '14:50', platform: '2' }
      ]
    },
    currentStatus: {
      status: 'Delayed',
      currentLocation: 'Nagpur',
      nextStation: 'Hyderabad',
      delay: 25,
      lastUpdated: new Date()
    },
    capacity: {
      totalSeats: 400,
      occupiedSeats: 380,
      waitingList: 45
    },
    operationalData: {
      speed: 110,
      fuelLevel: 70,
      engineHealth: 'Good',
      lastMaintenance: new Date('2024-01-10')
    }
  },
  {
    id: 'T003',
    trainId: 'T003',
    name: 'Shatabdi Express',
    type: 'Express',
    route: {
      origin: 'Mumbai',
      destination: 'Pune',
      intermediateStations: [
        { stationName: 'Lonavala', arrivalTime: '08:30', departureTime: '08:32', platform: '1' }
      ]
    },
    currentStatus: {
      status: 'On Time',
      currentLocation: 'Lonavala',
      nextStation: 'Pune',
      delay: 0,
      lastUpdated: new Date()
    },
    capacity: {
      totalSeats: 300,
      occupiedSeats: 285,
      waitingList: 8
    },
    operationalData: {
      speed: 140,
      fuelLevel: 95,
      engineHealth: 'Excellent',
      lastMaintenance: new Date('2024-01-20')
    }
  }
];

// GET /api/trains - Get all trains
router.get('/', (req, res) => {
  try {
    const { status, route, limit = 50 } = req.query;
    
    let filteredTrains = [...mockTrains];
    
    // Filter by status
    if (status) {
      filteredTrains = filteredTrains.filter(train => 
        train.currentStatus.status.toLowerCase().includes(status.toLowerCase())
      );
    }
    
    // Filter by route
    if (route) {
      filteredTrains = filteredTrains.filter(train => 
        train.route.origin.toLowerCase().includes(route.toLowerCase()) ||
        train.route.destination.toLowerCase().includes(route.toLowerCase())
      );
    }
    
    // Limit results
    filteredTrains = filteredTrains.slice(0, parseInt(limit));
    
    res.json({
      success: true,
      count: filteredTrains.length,
      data: filteredTrains
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch trains',
      message: error.message
    });
  }
});

// GET /api/trains/:id - Get train by ID
router.get('/:id', (req, res) => {
  try {
    const train = mockTrains.find(t => t.trainId === req.params.id.toUpperCase());
    
    if (!train) {
      return res.status(404).json({
        success: false,
        error: 'Train not found'
      });
    }
    
    res.json({
      success: true,
      data: train
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch train',
      message: error.message
    });
  }
});

// POST /api/trains - Create new train
router.post('/', (req, res) => {
  try {
    const newTrain = {
      id: req.body.trainId,
      trainId: req.body.trainId,
      name: req.body.name,
      type: req.body.type || 'Express',
      route: req.body.route,
      currentStatus: {
        status: req.body.currentStatus?.status || 'On Time',
        currentLocation: req.body.currentStatus?.currentLocation,
        nextStation: req.body.currentStatus?.nextStation,
        delay: req.body.currentStatus?.delay || 0,
        lastUpdated: new Date()
      },
      capacity: req.body.capacity,
      operationalData: req.body.operationalData
    };
    
    mockTrains.push(newTrain);
    
    res.status(201).json({
      success: true,
      message: 'Train created successfully',
      data: newTrain
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: 'Failed to create train',
      message: error.message
    });
  }
});

// PUT /api/trains/:id - Update train
router.put('/:id', (req, res) => {
  try {
    const trainIndex = mockTrains.findIndex(t => t.trainId === req.params.id.toUpperCase());
    
    if (trainIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Train not found'
      });
    }
    
    mockTrains[trainIndex] = {
      ...mockTrains[trainIndex],
      ...req.body,
      currentStatus: {
        ...mockTrains[trainIndex].currentStatus,
        ...req.body.currentStatus,
        lastUpdated: new Date()
      }
    };
    
    res.json({
      success: true,
      message: 'Train updated successfully',
      data: mockTrains[trainIndex]
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: 'Failed to update train',
      message: error.message
    });
  }
});

// DELETE /api/trains/:id - Delete train
router.delete('/:id', (req, res) => {
  try {
    const trainIndex = mockTrains.findIndex(t => t.trainId === req.params.id.toUpperCase());
    
    if (trainIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Train not found'
      });
    }
    
    const deletedTrain = mockTrains.splice(trainIndex, 1)[0];
    
    res.json({
      success: true,
      message: 'Train deleted successfully',
      data: deletedTrain
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: 'Failed to delete train',
      message: error.message
    });
  }
});

// GET /api/trains/:id/status - Get real-time train status
router.get('/:id/status', (req, res) => {
  try {
    const train = mockTrains.find(t => t.trainId === req.params.id.toUpperCase());
    
    if (!train) {
      return res.status(404).json({
        success: false,
        error: 'Train not found'
      });
    }
    
    // Simulate real-time updates
    const simulatedUpdate = {
      ...train.currentStatus,
      speed: train.operationalData.speed + Math.floor(Math.random() * 20) - 10,
      lastUpdated: new Date()
    };
    
    res.json({
      success: true,
      data: simulatedUpdate
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch train status',
      message: error.message
    });
  }
});

module.exports = router;