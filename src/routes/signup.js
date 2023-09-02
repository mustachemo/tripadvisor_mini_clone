import express from 'express';
import { getSignup } from '../controllers/signupController.js';

const signupRouter = express.Router();

signupRouter.route('/').get(getSignup);

export default signupRouter;
