import express from 'express';
import { getLogin, postLogin } from '../controllers/loginController.js';

const loginRouter = express.Router();

loginRouter.route('/').get(getLogin).post(postLogin);

export default loginRouter;
