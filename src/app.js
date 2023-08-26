import express from 'express';
import nunjucks from 'nunjucks';
import dotenv from 'dotenv';
// eslint-disable-next-line import/no-extraneous-dependencies
import logger from 'morgan';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';

dotenv.config();

const app = express();
const port = process.env.PORT;

nunjucks.configure('views', {
  autoescape: true,
  express: app,
});
app.set('view engine', 'njk');
app.set('env', process.env.NODE_ENV);
app.set('port', port);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(cors());
app.use('/public', express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/new', newMessageRouter);

export default app;
