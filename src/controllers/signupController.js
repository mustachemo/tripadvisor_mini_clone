import User from '../models/user.js';
import bycrypt from 'bcryptjs';

export const getSignup = (req, res) => {
  res.render('signup');
};

export const postSignup = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const userMatch = await User.findOne({ email: email });
    if (userMatch) {
      // Flash a message here
      req.flash('error', 'User already exists. Please login.');
      return res.redirect('/login');
    }

    bycrypt.hash(password, 10, async (err, hashedPassword) => {
      if (err) {
        // Flash a message here
        req.flash('error', 'Something went wrong. Please try again.');
        return next(err);
      } else {
        await User.create({ email, password: hashedPassword });
        return res.redirect('/login');
      }
    });
  } catch (err) {
    return next(err);
  }
};
