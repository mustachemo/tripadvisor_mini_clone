import express from 'express';
import {
  getCities,
  postCity,
  deleteCity,
  putCity,
} from '../controllers/indexController.js';
import uploadImage from '../middleware/uploadImage.js';

const indexRouter = express.Router();

indexRouter
  .route('/')
  .get(getCities)
  .post(uploadImage.single('cityImg'), postCity);

indexRouter.route('/:id').delete(deleteCity).put(putCity);
// TODO: Add routes for DELETE and PUT

export default indexRouter;
