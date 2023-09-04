import passport from 'passport';

export const getLogin = (req, res) => {
  res.render('login');
};

export const postLogin = async (req, res, next) => {
  try {
    passport.authenticate('local', {
      failureRedirect: '/login',
      failureFlash: true,
    })(req, res, (err) => {
      if (err) {
        console.log(err);
        throw new Error(err);
      }

      req.flash('success', 'Logged in successfully!');
      res.redirect('/');
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
