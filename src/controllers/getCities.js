import City from '../models/cities';

const getCities = async (req, res) => {
  try {
    const cities = await City.find();
    res.status(200).json({ cities });
  } catch (error) {
    res.status(404).json({ error });
  }
};

export default getCities;
