import express from 'express';
import { getCities, postCity } from '../controllers/indexController.js';
import uploadImage from '../middleware/uploadImage.js';

const indexRouter = express.Router();

indexRouter.route('/').get(getCities).post(uploadImage.single('cityImg'), postCity);

export default indexRouter;
