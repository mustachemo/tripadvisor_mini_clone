import express from 'express';
import { getCities, postCity } from '../controllers/indexController.js';

const indexRouter = express.Router();

indexRouter.route('/').get(getCities).post(postCity);

export default indexRouter;
