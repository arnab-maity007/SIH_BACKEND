const mongoose = require('mongoose');

const stationSchema = new mongoose.Schema({
  stationCode: {
    type: String,
    required: true,
    unique: true,
    uppercase: true
  },
  stationName: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  coordinates: {
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    }
  },
  platforms: [{
    platformNumber: String,
    length: Number, // in meters
    isElectrified: Boolean,
    canAccommodateTrainLength: Number
  }],
  facilities: {
    waitingRoom: Boolean,
    restaurant: Boolean,
    bookingCounter: Boolean,
    parking: Boolean,
    wifi: Boolean,
    restrooms: Boolean
  },
  connectivity: {
    connectedStations: [{
      stationCode: String,
      distance: Number, // in kilometers
      travelTime: Number // in minutes
    }]
  },
  trafficData: {
    dailyTrainCount: {
      type: Number,
      default: 0
    },
    peakHours: [{
      start: String,
      end: String,
      trainCount: Number
    }],
    congestionLevel: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Critical'],
      default: 'Low'
    }
  }
}, {
  timestamps: true
});

// Create indexes
stationSchema.index({ stationCode: 1 });
stationSchema.index({ city: 1, state: 1 });
stationSchema.index({ coordinates: '2dsphere' });

module.exports = mongoose.model('Station', stationSchema);