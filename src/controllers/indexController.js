import { City, CityImage } from '../models/cities.js';
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
    console.log('entered postCity');
    console.log(req.file);
    await connectDB();
    console.log('successfully connected to db');

    const { filename, originalname, mimetype } = req.file;
    const { cityName, cityDesc, cityURl, cityPop, cityArea, cityTZ } = req.body;

    const Image = new CityImage({
      name: originalname,
      img: {
        data: filename,
        contentType: mimetype,
      },
    });

    await Image.save();
    console.log('Image saved');

    const newCity = new City({
      name: cityName,
      description: cityDesc,
      url: cityURl,
      image: Image,
      population: cityPop,
      area: cityArea,
      timezone: cityTZ,
    });
    await newCity.save();
    console.log('City added');
    res.redirect('/');
  } catch (error) {
    console.log('City not added');
    res.status(404).json({ error });
  }
};
