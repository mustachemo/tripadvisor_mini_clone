import passport from 'passport';

export const getLogin = (req, res) => {
  res.render('login');
};

export const postLogin = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
});
