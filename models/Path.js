const mongoose = require("mongoose");
const geolib = require("geolib");

const { Schema } = mongoose;

// Define the Point schema for coordinates
const PointSchema = new Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true
  },
  coordinates: {
    type: [Number],
    required: true
  }
});

// Define the Path schema
const PathSchema = new Schema({
  type: {
    type: String,
    required: true
  },
  start: {
    type: PointSchema,
    required: true
  },
  end: {
    type: PointSchema,
    required: true
  },
  speed: {
    type: Number,
    required: false
  },
  distance: {
    type: Number,
    required: false,
    get: function() {
      if (this.start && this.end) {
        const start = { latitude: this.start.coordinates[1], longitude: this.start.coordinates[0] };
        const end = { latitude: this.end.coordinates[1], longitude: this.end.coordinates[0] };
        return geolib.getDistance(start, end);
      }
      return null;
    }
  },
  steps: {
    type: Number,
    required: false
  },
  calories: {
    type: Number,
    required: false
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Tham chiếu tới collection User trong MongoDB
    required: false
  }
}, {
  timestamps: true,
  toJSON: { getters: true },
  toObject: { getters: true } 
});

PathSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true
});

const PathModel = mongoose.model('Path', PathSchema);

module.exports = PathModel;
