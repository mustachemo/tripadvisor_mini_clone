import passport from 'passport';

export const getLogin = (req, res) => {
  res.render('login');
};

export const postLogin = async (req, res, next) => {
  try {
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true,
    })(req, res, next);
  } catch (err) {
    console.log(err);
    next(err);
  }
};
