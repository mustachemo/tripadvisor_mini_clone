import express from 'express';
import { getLogin } from '../controllers/loginController.js';

const signupRouter = express.Router();

signupRouter.route('/').get(getLogin);

export default signupRouter;
