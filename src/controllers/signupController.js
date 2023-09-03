import User from '../models/user.js';
import bycrypt from 'bcryptjs';

export const getSignup = (req, res) => {
  res.render('signup');
};

export const postSignup = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // // Check if user already exists
    // const userMatch = User.findOne({ email: email });
    // if (userMatch) {
    //   // i want to flash a message here
    //   req.flash('error', 'User already exists. Please login.');
    //   res.redirect('/login');
    // }

    bycrypt.hash(password, 10, async (err, hashedPassword) => {
      if (err) {
        // i want to flash a message here
        req.flash('error', 'Something went wrong. Please try again.');
        next(err);
      } else {
        await User.create({ email, password: hashedPassword });
        res.redirect('/login');
      }
    });
  } catch (err) {
    next(err);
  }
};
