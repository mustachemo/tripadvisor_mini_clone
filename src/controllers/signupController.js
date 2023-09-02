import User from '../models/user.js';

export const getSignup = (req, res) => {
  res.render('signup');
};

export const postSignup = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    await User.create({ email, password });

    res.redirect('/login');
  } catch (err) {
    next(err);
  }
};
