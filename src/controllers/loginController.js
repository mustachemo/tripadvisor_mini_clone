import passport from 'passport';
import flash from 'connect-flash';

export const getLogin = (req, res) => {
  res.render('login', { message: req.flash('error')[0] });
};

export const postLogin = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true,
  failureMessage: 'Invalid username or password.',
});
