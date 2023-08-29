import { City, CityImage } from '../models/cities.js';
import { connectDB } from '../configs/db.config.js';

export const getAttractions = async (req, res) => {
  try {
    await connectDB();
    const attractions = await City.find().populate('image');
  } catch {}
};

export const postAttractions = async (req, res) => {
  try {
    await connectDB();
    const { cityName, cityDesc, cityPop, cityArea, cityAHI } = req.body;
    let imageToSave = null;

    if (req.file) {
      const { originalname, buffer, mimetype } = req.file;

      const Image = new CityImage({
        name: originalname,
        img: {
          data: buffer,
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
  } catch {}
};
