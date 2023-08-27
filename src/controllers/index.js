import City from '../models/cities.js';
import { connectDB } from '../configs/db.config.js';

export const getCities = async (req, res) => {
  try {
    await connectDB();
    const cities = await City.find();
    res.render('index', { cities });
  } catch (error) {
    res.status(404).json({ error });
  }
};

export const postCity = async (req, res) => {
  try {
    await connectDB();
    const { name, country, img } = req.body;
    const newCity = new City({ name, country, img });
    await newCity.save();
    console.log('City added');
    res.redirect('/');
  } catch (error) {
    console.log('City not added');
    res.status(404).json({ error });
  }
};
