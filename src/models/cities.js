import mongoose from 'mongoose';

const imgFileSchema = new mongoose.Schema({
  name: String,
  img: {
    data: Buffer,
    contentType: String,
  },
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
  },
  { timestamps: true }
);

export const City = mongoose.model('City', citySchema);
export const CityImage = mongoose.model('Image', imgFileSchema);
