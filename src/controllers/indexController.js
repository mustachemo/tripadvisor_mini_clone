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

    res.render('index', { cities: modifiedCities });
    // }
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
      const { filename, buffer, mimetype } = req.file;
      console.log('before save');
      console.log('req.file: ', req.file);
      console.log(`filename: ${filename}, buffer: ${buffer}, mimetype: ${mimetype}`);

      const Image = new CityImage({
        name: filename,
        img: {
          data: buffer,
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
    console.log(newCity);
    res.redirect('/');
  } catch (error) {
    console.log('City not added: ', error);
    res.status(404).json({ error });
  }
};
