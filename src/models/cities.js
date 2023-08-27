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
    },
    image: imgFileSchema,
    population: Number,
    area: Number,
    AverageHouseholdIncome: Number,
  },
  { timestamps: true }
);

export const City = mongoose.model('City', citySchema);
export const CityImage = mongoose.model('CityImages', imgFileSchema);
