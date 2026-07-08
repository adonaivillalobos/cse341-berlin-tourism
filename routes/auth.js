const express = require('express');
const router = express.Router();
const passport = require('../auth');

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/api-docs');
  }
);

router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

router.get('/profile', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      message: 'You are logged in!',
      user: req.user
    });
  } else {
    res.status(401).json({ message: 'You are not logged in!' });
  }
});

module.exports = router;