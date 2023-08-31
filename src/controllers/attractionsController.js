import { City, CityImage } from '../models/cities.js';
import { connectDB } from '../configs/db.config.js';

export const getAttractions = async (req, res, next) => {
  try {
    // await connectDB();
    // const attractions = await City.find().populate('image');

    // res.render('attractions', { attractions: attractions });
    res.render('attractions');
  } catch (error) {
    next(error);
  }
};

export const postAttractions = async (req, res, next) => {
  try {
    // await connectDB();
  } catch (error) {
    next(error);
  }
};
