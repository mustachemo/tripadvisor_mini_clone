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
    }));

    console.log(modifiedCities[0].image.img.contentType);
    console.log(modifiedCities[0].image.img.data);

    res.render('index', { cities: modifiedCities });
  } catch (error) {
    res.status(404).json({ error });
  }
};

export const postCity = async (req, res) => {
  try {
    await connectDB();

    const { cityName, cityDesc, cityPop, cityArea, cityTZ } = req.body;
    let imageToSave = null;

    // Check if an image was uploaded
    if (req.file) {
      const { filename, originalname, mimetype } = req.file;

      const Image = new CityImage({
        name: originalname,
        img: {
          data: filename,
          contentType: mimetype,
        },
      });

      await Image.save();
      console.log('Image saved');

      imageToSave = Image;
    }

    const newCity = new City({
      name: cityName,
      description: cityDesc,
      image: imageToSave,
      population: cityPop,
      area: cityArea,
      timezone: cityTZ,
    });

    await newCity.save();
    console.log('City added');
    res.redirect('/');
  } catch (error) {
    console.log('City not added: ', error);
    res.status(404).json({ error });
  }
};
