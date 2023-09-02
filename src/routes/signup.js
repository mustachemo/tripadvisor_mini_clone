import express from 'express';
import { getSignup, postSignup } from '../controllers/signupController.js';

const signupRouter = express.Router();

signupRouter.route('/').get(getSignup).post(postSignup);

export default signupRouter;
