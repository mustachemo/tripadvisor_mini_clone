import City from '../models/cities.js';
import { connectDB } from '../configs/db.config.js';

const getCities = async (req, res) => {
  try {
    await connectDB();
    const cities = await City.find();
    res.render('index', { cities });
  } catch (error) {
    res.status(404).json({ error });
  }
};

export default getCities;
