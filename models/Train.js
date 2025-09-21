const mongoose = require('mongoose');

const trainSchema = new mongoose.Schema({
  trainId: {
    type: String,
    required: true,
    unique: true,
    uppercase: true
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Express', 'Passenger', 'Freight', 'Metro', 'Suburban'],
    default: 'Express'
  },
  route: {
    origin: {
      type: String,
      required: true
    },
    destination: {
      type: String,
      required: true
    },
    intermediateStations: [{
      stationName: String,
      arrivalTime: String,
      departureTime: String,
      platform: String
    }]
  },
  currentStatus: {
    status: {
      type: String,
      enum: ['On Time', 'Delayed', 'Cancelled', 'Boarding', 'Departed'],
      default: 'On Time'
    },
    currentLocation: {
      type: String,
      required: true
    },
    nextStation: {
      type: String,
      required: true
    },
    delay: {
      type: Number,
      default: 0 // delay in minutes
    },
    lastUpdated: {
      type: Date,
      default: Date.now
    }
  },
  capacity: {
    totalSeats: {
      type: Number,
      required: true
    },
    occupiedSeats: {
      type: Number,
      default: 0
    },
    waitingList: {
      type: Number,
      default: 0
    }
  },
  operationalData: {
    speed: {
      type: Number,
      default: 0 // current speed in km/h
    },
    fuelLevel: {
      type: Number,
      default: 100 // percentage
    },
    engineHealth: {
      type: String,
      enum: ['Excellent', 'Good', 'Fair', 'Poor', 'Critical'],
      default: 'Good'
    },
    lastMaintenance: {
      type: Date
    }
  }
}, {
  timestamps: true
});

// Create indexes for efficient querying
trainSchema.index({ trainId: 1 });
trainSchema.index({ 'currentStatus.status': 1 });
trainSchema.index({ 'route.origin': 1, 'route.destination': 1 });

module.exports = mongoose.model('Train', trainSchema);