import mongoose from 'mongoose';

const imgFileSchema = new mongoose.Schema({
  name: String,
  img: {
    data: Buffer,
    contentType: String,
  },
});

const attractionSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: imgFileSchema,
});

const citySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    description: {
      type: String,
      trim: true,
    },
    image: imgFileSchema,
    population: Number,
    area: Number,
    AverageHouseholdIncome: Number,
    attractions: [attractionSchema],
  },
  { timestamps: true }
);

// this is a middleware that runs before the model is saved
// it is called when we create a new model or update an existing one
// it is automatically called by mongoose
citySchema.pre('save', async function (next) {
  const city = this;

  if (city.isModified('image')) {
    // if the image has been changed, we resize it
    city.image = await sharp(city.image).resize(250, 250).png().toBuffer();
  }

  next();
});

// this is a middleware that runs before the model is removed
// it is called when we delete a model
// it is automatically called by mongoose
citySchema.pre('remove', async function (next) {
  const city = this;
  // we delete all the attractions that belong to the city
  await Attraction.deleteMany({ city: city._id });
  next();
});

// this is a method that is available on the instance of the model
// it is called when the model is converted to JSON, which happens when we send it back to the client
// it is automatically called by express when we send the response
citySchema.methods.toJSON = function () {
  const city = this;
  const cityObject = city.toObject();

  delete cityObject.image;
  delete cityObject.attractions;

  return cityObject;
};

// this is a method that is available on the model itself
// it is called when we use res.send() to send the model back to the client
// it is automatically called by express when we send the response
citySchema.virtual('url').get(function () {
  return `/cities/${this._id}`;
});

export const City = mongoose.model('City', citySchema);
export const CityImage = mongoose.model('CityImages', imgFileSchema);
