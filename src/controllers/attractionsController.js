import { City, CityImage, Attraction } from '../models/cities.js';
import { connectDB } from '../configs/db.config.js';

export const getAttractions = async (req, res, next) => {
  try {
    const attractions = await Attraction.find({});

    res.render('attractions', { attractions: attractions });
  } catch (error) {
    next(error);
  }
};

export const postAttractions = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
