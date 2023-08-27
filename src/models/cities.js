import mongoose from 'mongoose';

const citySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    url: {
      type: String,
      trim: true,
    },
    image: String,
    population: Number,
    area: Number,
    timezone: String,
    website: String,
    highlights: [String],
  },
  { timestamps: true }
);

citySchema.index({ location: '2dsphere' });

const City = mongoose.model('City', citySchema);

export default City;
