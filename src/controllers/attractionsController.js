import { City, CityImage, Attraction } from '../models/cities.js';
import { connectDB } from '../configs/db.config.js';

export const getAttractions = async (req, res, next) => {
  try {
    const cityName = req.params.name; // Access the city name from the URL parameter
    console.log(`cityName: ${cityName}`);
    const attractions = await Attraction.find({}); // Assuming you have a 'city' field in your Attraction schema

    res.render('attractions', { attractions: attractions, cityName }); // Pass the city data to the view
  } catch (error) {
    next(error);
  }
};

export const postAttractions = async (req, res, next) => {
  try {
    const cityName = req.params.name; // Access the city name from the URL parameter
    const { attractionName, attractionDesc } = req.body;
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

    const refCity = await City.findOne({ name: cityName });

    const newAttraction = new Attraction({
      city: refCity,
      name: attractionName,
      description: attractionDesc,
      image: imageToSave,
    });

    await newAttraction.save();

    req.flash('success', 'Attraction added successfully');
    res.redirect('/');
  } catch (error) {
    next(error);
  }
};
