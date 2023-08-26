import express from 'express';

const indexRouter = express.Router();

indexRouter.route('/').get(getCatageories);

export default indexRouter;
