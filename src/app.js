import express from 'express';
import nunjucks from 'nunjucks';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import logger from 'morgan';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';
import indexRouter from './routes/index.js';

dotenv.config();

const app = express();
const port = process.env.PORT;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

nunjucks.configure(path.join(__dirname, 'views'), {
  autoescape: true,
  express: app,
});
app.set('view engine', 'njk');
app.set('env', process.env.NODE_ENV);
app.set('port', port);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(cors());
app.use('/public', express.static('public'));

app.use('/', indexRouter);
// app.use('/new', newMessageRouter);

export default app;
