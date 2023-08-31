import { City, CityImage } from '../models/cities.js';
import { connectDB } from '../configs/db.config.js';
import formatNumber from '../middleware/formatPopulation.js';
import sharp from 'sharp';

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

    // cities.forEach(city => {
    //   const cityJsonString = JSON.stringify(city.image);
    //   const citySizeInBytes = Buffer.byteLength(cityJsonString, 'utf-8');
    //   console.log(`Size of city ${city.name} image: ${citySizeInBytes} bytes`);
    // });

    res.render('index', { cities: modifiedCities });
  } catch (error) {
    next(error);
  }
};

export const postCity = async (req, res, next) => {
  try {
    // await connectDB();

    const { cityName, cityDesc, cityPop, cityArea, cityAHI } = req.body;
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

export const deleteCity = async (req, res, next) => {
  try {
    const { id } = req.params;
    await City.findByIdAndDelete(id);
    res.redirect('/');
  } catch (error) {
    next(error);
  }
};

export const putCity = async (req, res, next) => {
  console.log('Entered putCity');
  try {
    console.log('Entered try block');
    const { cityID, cityName, cityDesc, cityPop, cityArea, cityAHI } = req.body;
    console.log(
      `cityID: ${cityID}, cityName: ${cityName}, cityDesc: ${cityDesc}, cityPop: ${cityPop}, cityArea: ${cityArea}, cityAHI: ${cityAHI}`
    );

    const filter = { _id: cityID };

    const update = {};

    if (cityName !== undefined && cityName !== null) {
      update.name = cityName;
    }
    if (cityDesc !== undefined && cityDesc !== null) {
      update.description = cityDesc;
    }
    if (cityPop !== undefined && cityPop !== null) {
      update.population = cityPop;
    }
    if (cityArea !== undefined && cityArea !== null) {
      update.area = cityArea;
    }
    if (cityAHI !== undefined && cityAHI !== null) {
      update.AverageHouseholdIncome = cityAHI;
    }

    await City.findOneAndUpdate(filter, update, {
      new: true,
    });

    res.redirect('/');
  } catch (error) {
    next(error);
  }
};
