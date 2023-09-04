import express from 'express';
import uploadImage from '../middleware/uploadImage.js';
import {
  getAttractions,
  postAttractions,
  deleteCity,
} from '../controllers/attractionsController.js';

const attractionsRouter = express.Router();

attractionsRouter
  .route('/:name')
  .get(getAttractions)
  .post(uploadImage.single('attractionImg'), postAttractions);

attractionsRouter
  .route('/:id')
  .put(uploadImage.single('attractionImgPUT'))
  .delete(deleteCity);

export default attractionsRouter;
