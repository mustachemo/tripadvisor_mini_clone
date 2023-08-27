import mongoose from 'mongoose';

const imgFileSchema = new mongoose.Schema({
  name: String,
  data: Buffer,
});

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
      trim: true,
      lowercase: true,
    },
    url: {
      type: String,
      trim: true,
    },
    image: imgFileSchema,
    population: Number,
    area: Number,
    timezone: String,
    website: String,
    highlights: [String],
  },
  { timestamps: true }
);

const City = mongoose.model('City', citySchema);

export default City;
