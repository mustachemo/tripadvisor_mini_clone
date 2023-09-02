import passport from 'passport';

export const getLogin = (req, res) => {
  res.render('login', { message: req.flash('error')[0] });
};

export const postLogin = (req, res, next) => {
  console.log('Request body:', req.body); // Add this line to log the request body
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
  })(req, res, next);
};
