function roleMiddleware(role) {
  return (req, res, next) => {
    const userRole = req.user.role;

    if (userRole !== role) {
      return res.status(401).json({ msg: 'Unauthorized' });
    } else {
      next();
    }
  };
}

module.exports = roleMiddleware;
