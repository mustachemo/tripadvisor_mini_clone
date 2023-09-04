import express from 'express';
import uploadImage from '../middleware/uploadImage.js';
import {
  getAttractions,
  postAttractions,
} from '../controllers/attractionsController.js';

const attractionsRouter = express.Router();

attractionsRouter
  .route('/:name')
  .get(getAttractions)
  .post(uploadImage.single('attractionImg'), postAttractions);

export default attractionsRouter;
