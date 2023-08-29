import express from 'express';
import uploadImage from '../middleware/uploadImage.js';

const attractionsController = express.Router();

attractionsController.route('/:id').get();

export default attractionsController;
