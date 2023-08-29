import express from 'express';
import uploadImage from '../middleware/uploadImage.js';
import { getAttractions, postAttractions } from '../controllers/attractionsController.js';
import { get } from 'lodash';

const attractionsController = express.Router();

attractionsController.route('/:id').get(getAttractions).post(uploadImage.single('attractionsImg'), postAttractions);

export default attractionsController;
