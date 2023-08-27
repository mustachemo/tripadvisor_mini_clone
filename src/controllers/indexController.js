import { City, CityImage } from '../models/cities.js';
import { connectDB } from '../configs/db.config.js';
import formatNumber from '../middleware/formatPopulation.js';

export const getCities = async (req, res) => {
  try {
    await connectDB();
    const cities = await City.find().populate('image');

    const modifiedCities = cities.map(city => ({
      ...city.toObject(),
      population: formatNumber(city.population),
      AHI: formatNumber(city.AverageHouseholdIncome),
    }));

    console.log('modifiedCities: ', modifiedCities);

    res.render('index', { cities: modifiedCities });
    // }
  } catch (error) {
    res.status(404).json({ error });
  }
};

export const postCity = async (req, res) => {
  try {
    await connectDB();

    const { cityName, cityDesc, cityPop, cityArea, cityAHI } = req.body;
    let imageToSave = null;

    // Check if an image was uploaded
    if (req.file) {
      const { originalname, buffer, mimetype } = req.file;

      const Image = new CityImage({
        name: originalname,
        img: {
          data: buffer,
          contentType: mimetype,
        },
      });

      console.log('filename: ', originalname);
      console.log('Image name: ', Image.name);

      await Image.save();
      imageToSave = Image;
    }

    const newCity = new City({
      name: cityName,
      description: cityDesc,
      image: imageToSave,
      population: cityPop,
      area: cityArea,
      AverageHouseholdIncome: cityAHI,
    });

    await newCity.save();
    res.redirect('/');
  } catch (error) {
    console.log('City not added: ', error);
    res.status(404).json({ error });
  }
};
