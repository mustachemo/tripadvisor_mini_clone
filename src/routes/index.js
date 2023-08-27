import express from 'express';
import getCities from '../controllers/getCities.js';

const indexRouter = express.Router();

indexRouter.route('/').get(getCities);

export default indexRouter;
