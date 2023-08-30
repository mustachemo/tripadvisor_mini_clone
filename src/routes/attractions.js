import express from 'express';
import uploadImage from '../middleware/uploadImage.js';
import { getAttractions, postAttractions } from '../controllers/attractionsController.js';

const attractionsController = express.Router();

attractionsController.route('/:name').get(getAttractions).post(uploadImage.single('attractionsImg'), postAttractions);

export default attractionsController;
