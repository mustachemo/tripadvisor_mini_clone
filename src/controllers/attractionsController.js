import { City, CityImage, Attraction } from '../models/cities.js';
import { connectDB } from '../configs/db.config.js';

export const getAttractions = async (req, res, next) => {
  try {
    const attractions = await Attraction.find({});
    const cities = await City.find({});

    res.render('attractions', { attractions: attractions });
  } catch (error) {
    next(error);
  }
};

export const postAttractions = async (req, res, next) => {
  try {
    const { attractionName, attractionDesc } = req.body;
    let imageToSave = null;

    console.log(
      `attractionName: ${attractionName}, attractionDesc: ${attractionDesc}`
    );
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

    const newAttraction = new Attraction({
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
