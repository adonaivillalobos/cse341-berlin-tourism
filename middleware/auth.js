const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'You must be logged in to perform this action. Please visit /auth/google to login.' });
};

module.exports = { isAuthenticated };