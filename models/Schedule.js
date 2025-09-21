const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  scheduleId: {
    type: String,
    required: true,
    unique: true,
    uppercase: true
  },
  trainId: {
    type: String,
    required: true,
    ref: 'Train'
  },
  route: {
    origin: {
      type: String,
      required: true
    },
    destination: {
      type: String,
      required: true
    }
  },
  timing: {
    departureTime: {
      type: String,
      required: true
    },
    arrivalTime: {
      type: String,
      required: true
    },
    journeyDuration: {
      type: String,
      required: true
    }
  },
  frequency: {
    type: String,
    enum: ['Daily', 'Weekly', 'BiWeekly', 'Monthly', 'Seasonal'],
    default: 'Daily'
  },
  daysOfOperation: [{
    type: String,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  }],
  platformInfo: {
    departurePlatform: String,
    arrivalPlatform: String
  },
  pricing: {
    generalClass: Number,
    sleeperClass: Number,
    acThreeTier: Number,
    acTwoTier: Number,
    acFirstClass: Number
  },
  isActive: {
    type: Boolean,
    default: true
  },
  effectiveDate: {
    from: {
      type: Date,
      required: true
    },
    to: {
      type: Date
    }
  }
}, {
  timestamps: true
});

// Create indexes
scheduleSchema.index({ scheduleId: 1 });
scheduleSchema.index({ trainId: 1 });
scheduleSchema.index({ 'route.origin': 1, 'route.destination': 1 });
scheduleSchema.index({ isActive: 1 });

module.exports = mongoose.model('Schedule', scheduleSchema);