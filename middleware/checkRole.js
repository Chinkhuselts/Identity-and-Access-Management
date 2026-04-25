module.exports = (roleName) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    if (req.user.role !== roleName) {
      return res.status(403).json({ 
        error: `Access denied. Requires ${roleName} role` 
      });
    }

    next();
  };
};