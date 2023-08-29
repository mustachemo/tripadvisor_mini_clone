import { City, CityImage } from '../models/cities.js';
import { connectDB } from '../configs/db.config.js';

export const getAttractions = async (req, res) => {
  try {
    await connectDB();
    const attractions = await City.find().populate('image');

    res.render('attractions', { attractions: attractions });
  } catch {}
};

export const postAttractions = async (req, res) => {
  try {
    await connectDB();
  } catch {}
};
