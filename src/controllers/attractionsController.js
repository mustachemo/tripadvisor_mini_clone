import { City, CityImage, Attraction } from '../models/cities.js';
import { connectDB } from '../configs/db.config.js';
import sharp from 'sharp';
import Joi from 'joi';
import _ from 'lodash';

export const getAttractions = async (req, res, next) => {
  try {
    const cityName = req.params.name;
    const refCity = await City.findOne({ name: cityName });

    const attractions = await Attraction.find({ city: refCity });

    // check if attractions is empty
    if (_.isEmpty(attractions)) {
      console.log('No attractions found');
    }

    res.render('attractions', { attractions: attractions, cityName });
  } catch (error) {
    next(error);
  }
};

export const postAttractions = async (req, res, next) => {
  try {
    const cityName = req.params.name;
    const { attractionName, attractionDesc } = req.body;
    let imageToSave = null;

    // Check if an image was uploaded
    if (req.file) {
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

    const refCity = await City.findOne({ name: cityName });

    const newAttraction = new Attraction({
      city: refCity,
      name: attractionName,
      description: attractionDesc,
      image: imageToSave,
    });

    await newAttraction.save();

    req.flash('success', 'Attraction added successfully');
    res.redirect(`/cities/${cityName}`);
  } catch (error) {
    next(error);
  }
};

export const deleteCity = async (req, res, next) => {
  try {
    const { id } = req.params;
    const attraction = await Attraction.findById(id);
    const cityName = attraction.city.name;

    await Attraction.findByIdAndDelete(id);

    req.flash('success', 'Attraction deleted successfully');
    res.redirect(`/cities/${cityName}`);
  } catch (error) {
    next(error);
  }
};

export const putAttractions = async (req, res, next) => {
  try {
    const schema = Joi.object({
      attractionID: Joi.string().required(),
      attractionName: Joi.string(),
      attractionDesc: Joi.string(),
    });

    const { attractionID, attractionName, attractionDesc } = req.body;

    schema.validate({
      attractionID,
      attractionName,
      attractionDesc,
    });

    const filter = { _id: attractionID };

    const update = {};

    if (attractionName !== '') update.name = attractionName;
    if (attractionDesc !== '') update.description = attractionDesc;
    if (req.file) {
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
      update.image = Image;
    }

    const refAttraction = await Attraction.findOneAndUpdate(filter, update, {
      new: true,
    });

    const cityName = await City.findOne({ _id: refAttraction.city });

    req.flash('success', 'Attraction updated successfully');
    res.redirect(`/cities/${cityName}`);
  } catch (error) {
    next(error);
  }
};
