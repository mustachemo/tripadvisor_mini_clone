import User from '../models/user.js';

export const getSignup = (req, res) => {
  res.render('signup');
};

export const postSignup = async (req, res, next) => {
  try {
    const { email, password, repeatPassword } = req.body;
    const user = await User.create({ email, password });
    req.session.user = user;
    res.status(201).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};
