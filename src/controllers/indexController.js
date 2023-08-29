import { City, CityImage } from '../models/cities.js';
import { connectDB } from '../configs/db.config.js';
import formatNumber from '../middleware/formatPopulation.js';
import sharp from 'sharp';

export const getCities = async (req, res, next) => {
  try {
    await connectDB();
    const cities = await City.find().populate('image');

    const modifiedCities = cities.map(city => ({
      ...city.toObject(),
      name: city.name.toUpperCase(),
      population: formatNumber(city.population),
      AHI: formatNumber(city.AverageHouseholdIncome),
    }));

    cities.forEach(city => {
      const cityJsonString = JSON.stringify(city.image);
      const citySizeInBytes = Buffer.byteLength(cityJsonString, 'utf-8');
      console.log(`Size of city ${city.name}: ${citySizeInBytes} bytes`);
    });

    res.render('index', { cities: modifiedCities });
  } catch (error) {
    next(error);
  }
};

export const postCity = async (req, res, next) => {
  try {
    await connectDB();

    const { cityName, cityDesc, cityPop, cityArea, cityAHI } = req.body;
    let imageToSave = null;

    // Check if an image was uploaded
    if (req.file) {
      const { originalname, buffer, mimetype } = req.file;
      let resizedBuffer = 0;
      sharp(buffer)
        .resize(250, 250)
        .png({ quality: 80, compressionLevel: 3 })
        .toBuffer((err, buffer, info) => {
          resizedBuffer = buffer;
          console.log(`buffer: ${buffer}`);
          console.log(info);
        });

      const Image = new CityImage({
        name: originalname,
        img: {
          data: resizedBuffer,
          contentType: mimetype,
        },
      });

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
    next(error);
  }
};
