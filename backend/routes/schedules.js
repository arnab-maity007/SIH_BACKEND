const express = require('express');
const router = express.Router();

// Mock schedules data
const mockSchedules = [
  {
    id: 'S001',
    scheduleId: 'S001',
    trainId: 'T001',
    route: {
      origin: 'Delhi',
      destination: 'Mumbai'
    },
    timing: {
      departureTime: '08:00',
      arrivalTime: '20:00',
      journeyDuration: '12h 00m'
    },
    frequency: 'Daily',
    daysOfOperation: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    platformInfo: {
      departurePlatform: 'Platform 1',
      arrivalPlatform: 'Platform 3'
    },
    pricing: {
      generalClass: 450,
      sleeperClass: 680,
      acThreeTier: 1200,
      acTwoTier: 1800,
      acFirstClass: 2500
    },
    isActive: true,
    effectiveDate: {
      from: new Date('2024-01-01'),
      to: new Date('2024-12-31')
    }
  },
  {
    id: 'S002',
    scheduleId: 'S002',
    trainId: 'T002',
    route: {
      origin: 'Delhi',
      destination: 'Chennai'
    },
    timing: {
      departureTime: '14:30',
      arrivalTime: '10:15+1',
      journeyDuration: '19h 45m'
    },
    frequency: 'Daily',
    daysOfOperation: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    platformInfo: {
      departurePlatform: 'Platform 2',
      arrivalPlatform: 'Platform 1'
    },
    pricing: {
      generalClass: 780,
      sleeperClass: 1150,
      acThreeTier: 2100,
      acTwoTier: 3200,
      acFirstClass: 4500
    },
    isActive: true,
    effectiveDate: {
      from: new Date('2024-01-01'),
      to: new Date('2024-12-31')
    }
  },
  {
    id: 'S003',
    scheduleId: 'S003',
    trainId: 'T003',
    route: {
      origin: 'Mumbai',
      destination: 'Pune'
    },
    timing: {
      departureTime: '06:15',
      arrivalTime: '09:45',
      journeyDuration: '3h 30m'
    },
    frequency: 'Daily',
    daysOfOperation: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    platformInfo: {
      departurePlatform: 'Platform 4',
      arrivalPlatform: 'Platform 2'
    },
    pricing: {
      generalClass: 180,
      sleeperClass: 280,
      acThreeTier: 450,
      acTwoTier: 650,
      acFirstClass: 900
    },
    isActive: true,
    effectiveDate: {
      from: new Date('2024-01-01'),
      to: new Date('2024-12-31')
    }
  }
];

// GET /api/schedules - Get all schedules
router.get('/', (req, res) => {
  try {
    const { origin, destination, date, trainId, limit = 50 } = req.query;
    
    let filteredSchedules = [...mockSchedules];
    
    // Filter by origin
    if (origin) {
      filteredSchedules = filteredSchedules.filter(schedule => 
        schedule.route.origin.toLowerCase().includes(origin.toLowerCase())
      );
    }
    
    // Filter by destination
    if (destination) {
      filteredSchedules = filteredSchedules.filter(schedule => 
        schedule.route.destination.toLowerCase().includes(destination.toLowerCase())
      );
    }
    
    // Filter by trainId
    if (trainId) {
      filteredSchedules = filteredSchedules.filter(schedule => 
        schedule.trainId === trainId.toUpperCase()
      );
    }
    
    // Filter by date (check if service is active on that date)
    if (date) {
      const queryDate = new Date(date);
      const dayName = queryDate.toLocaleDateString('en-US', { weekday: 'long' });
      
      filteredSchedules = filteredSchedules.filter(schedule => 
        schedule.isActive &&
        schedule.daysOfOperation.includes(dayName) &&
        queryDate >= schedule.effectiveDate.from &&
        (!schedule.effectiveDate.to || queryDate <= schedule.effectiveDate.to)
      );
    }
    
    // Limit results
    filteredSchedules = filteredSchedules.slice(0, parseInt(limit));
    
    res.json({
      success: true,
      count: filteredSchedules.length,
      data: filteredSchedules
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch schedules',
      message: error.message
    });
  }
});

// GET /api/schedules/:id - Get schedule by ID
router.get('/:id', (req, res) => {
  try {
    const schedule = mockSchedules.find(s => s.scheduleId === req.params.id.toUpperCase());
    
    if (!schedule) {
      return res.status(404).json({
        success: false,
        error: 'Schedule not found'
      });
    }
    
    res.json({
      success: true,
      data: schedule
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch schedule',
      message: error.message
    });
  }
});

// POST /api/schedules - Create new schedule
router.post('/', (req, res) => {
  try {
    const newSchedule = {
      id: req.body.scheduleId,
      scheduleId: req.body.scheduleId,
      trainId: req.body.trainId,
      route: req.body.route,
      timing: req.body.timing,
      frequency: req.body.frequency || 'Daily',
      daysOfOperation: req.body.daysOfOperation || ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      platformInfo: req.body.platformInfo,
      pricing: req.body.pricing,
      isActive: req.body.isActive !== undefined ? req.body.isActive : true,
      effectiveDate: req.body.effectiveDate
    };
    
    mockSchedules.push(newSchedule);
    
    res.status(201).json({
      success: true,
      message: 'Schedule created successfully',
      data: newSchedule
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: 'Failed to create schedule',
      message: error.message
    });
  }
});

// PUT /api/schedules/:id - Update schedule
router.put('/:id', (req, res) => {
  try {
    const scheduleIndex = mockSchedules.findIndex(s => s.scheduleId === req.params.id.toUpperCase());
    
    if (scheduleIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Schedule not found'
      });
    }
    
    mockSchedules[scheduleIndex] = {
      ...mockSchedules[scheduleIndex],
      ...req.body
    };
    
    res.json({
      success: true,
      message: 'Schedule updated successfully',
      data: mockSchedules[scheduleIndex]
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: 'Failed to update schedule',
      message: error.message
    });
  }
});

// DELETE /api/schedules/:id - Delete schedule
router.delete('/:id', (req, res) => {
  try {
    const scheduleIndex = mockSchedules.findIndex(s => s.scheduleId === req.params.id.toUpperCase());
    
    if (scheduleIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Schedule not found'
      });
    }
    
    const deletedSchedule = mockSchedules.splice(scheduleIndex, 1)[0];
    
    res.json({
      success: true,
      message: 'Schedule deleted successfully',
      data: deletedSchedule
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: 'Failed to delete schedule',
      message: error.message
    });
  }
});

// GET /api/schedules/search - Advanced schedule search
router.get('/search/routes', (req, res) => {
  try {
    const { from, to, date, class: ticketClass } = req.query;
    
    if (!from || !to) {
      return res.status(400).json({
        success: false,
        error: 'Both origin and destination are required'
      });
    }
    
    let availableSchedules = mockSchedules.filter(schedule => 
      schedule.route.origin.toLowerCase().includes(from.toLowerCase()) &&
      schedule.route.destination.toLowerCase().includes(to.toLowerCase()) &&
      schedule.isActive
    );
    
    // Add pricing for specific class if requested
    if (ticketClass && availableSchedules.length > 0) {
      availableSchedules = availableSchedules.map(schedule => ({
        ...schedule,
        selectedClassPrice: schedule.pricing[ticketClass] || 'Not Available'
      }));
    }
    
    res.json({
      success: true,
      searchQuery: { from, to, date, class: ticketClass },
      count: availableSchedules.length,
      data: availableSchedules
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to search schedules',
      message: error.message
    });
  }
});

module.exports = router;