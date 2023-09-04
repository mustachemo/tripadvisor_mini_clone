import { City, CityImage } from '../models/cities.js';
import User from '../models/user.js';
import { connectDB } from '../configs/db.config.js';
import formatNumber from '../middleware/formatPopulation.js';
import sharp from 'sharp';
import Joi from 'joi';
import _ from 'lodash';

// * Need to make this faster
export const getCities = async (req, res, next) => {
  try {
    const cities = await City.find().populate('image');

    const modifiedCities = cities.map((city) => ({
      ...city.toObject(),
      id: city._id,
      name: city.name.toUpperCase(),
      population: formatNumber(city.population),
      AHI: formatNumber(city.AverageHouseholdIncome),
      url: city.url,
    }));

    // // return all cities with name starting with 'TEST' and delete them
    // const filteredCities = _.filter(modifiedCities, (city) => {
    //   return city.name.startsWith('TEST');
    // });
    // const filteredCityNames = filteredCities.map((city) => city.name);
    // const deletedCities = await City.deleteMany({
    //   name: { $in: filteredCityNames },
    // });

    res.render('index', { cities: modifiedCities });
  } catch (error) {
    next(error);
  }
};

export const postCity = async (req, res, next) => {
  try {
    const { cityName, cityDesc, cityPop, cityArea, cityAHI } = req.body;
    let imageToSave = null;

    // Check if an image was uploaded
    console.log(`req.file: ${req.file}`);
    if (req.file) {
      console.log(`entered if statement`);
      const { originalname, buffer, mimetype } = req.file;

      // Resize and compress the image
      // const resizedBuffer = await new Promise((resolve, reject) => {
      //   sharp(buffer)
      //     .resize(250, 250)
      //     .png({ quality: 80 })
      //     .toBuffer((err, resizedBuffer, info) => {
      //       if (err) {
      //         reject(err);
      //       } else {
      //         resolve(resizedBuffer);
      //       }
      //     });
      // });

      const Image = new CityImage({
        name: originalname,
        img: {
          data: buffer /* Use resizedBuffer instead for compressed images */,
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

    req.flash('success', 'City added successfully');
    res.redirect('/');
  } catch (error) {
    next(error);
  }
};

export const deleteCity = async (req, res, next) => {
  try {
    const { id } = req.params;
    await City.findByIdAndDelete(id);
    req.flash('success', 'City deleted successfully');
    res.redirect('/');
  } catch (error) {
    next(error);
  }
};

export const putCity = async (req, res, next) => {
  console.log('Entered putCity');
  try {
    const schema = Joi.object({
      cityID: Joi.string().required(),
      cityName: Joi.string(),
      cityDesc: Joi.string(),
      cityPop: Joi.number(),
      cityArea: Joi.number(),
      cityAHI: Joi.number(),
    });

    const { cityID, cityName, cityDesc, cityPop, cityArea, cityAHI } = req.body;

    schema.validate({
      cityID,
      cityName,
      cityDesc,
      cityPop,
      cityArea,
      cityAHI,
    });

    const filter = { _id: cityID };

    const update = {};
    if (cityName !== '') update.name = cityName;
    if (cityDesc !== '') update.description = cityDesc;
    if (cityPop !== '') update.population = cityPop;
    if (cityArea !== '') update.area = cityArea;
    if (cityAHI !== '') update.AverageHouseholdIncome = cityAHI;

    await City.findOneAndUpdate(filter, update, {
      new: true,
    });

    req.flash('success', 'City updated successfully');
    res.redirect('/');
  } catch (error) {
    next(error);
  }
};
