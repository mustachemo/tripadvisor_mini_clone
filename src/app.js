import express from 'express';
import nunjucks from 'nunjucks';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import logger from 'morgan';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';
import session from 'express-session';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from './models/user.js';
import flash from 'connect-flash';
import indexRouter from './routes/index.js';
import attractionsRouter from './routes/attractions.js';
import errorHandler from './middleware/errorHandling.js';
import signupRouter from './routes/signup.js';
import loginRouter from './routes/login.js';
// ? How could I use isocket.io in this project?
// TODO: Use firebase for user authentication, it's easier, free, secure, fast, and is a node module

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
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ email: username });
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (user.password !== password) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);
passport.serializeUser((user, done) => {
  done(null, user._id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    return done(null, user);
  } catch (err) {
    return done(err);
  }
});

app.use(passport.initialize());
app.use(passport.session());
app.use('/public', express.static('public'));

app.use('/', indexRouter);
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/logout', (req, res, next) => {
  try {
    req.logout((err) => {
      if (err) {
        console.log(err);
        next(err);
      }
    });
    res.redirect('/');
  } catch (err) {
    console.log(err);
    next(err);
  }
});
app.use('/cities', attractionsRouter);

app.use(errorHandler);

export default app;
