// backend/middlewares/auth.js
const jwt = require('jsonwebtoken');

function verifyPolice(req, res, next) {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role === 'police') {
      req.user = decoded; // attach decoded user to request
      next();
    } else {
      res.status(403).json({ message: 'Forbidden: Police only' });
    }
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
}

module.exports = { verifyPolice };
