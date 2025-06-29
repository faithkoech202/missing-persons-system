// backend/middlewares/auth.js
const jwt = require('jsonwebtoken');

// Middleware to verify token from Authorization header
function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];

  // Check if the header exists and starts with "Bearer "
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    req.user = decoded;
    next();
  });
}

// Optional: Middleware to restrict to police role
function verifyPolice(req, res, next) {
  if (req.user && req.user.role === 'police') {
    return next();
  }
  return res.status(403).json({ message: 'Access restricted to police only' });
}

module.exports = verifyToken;
module.exports.verifyPolice = verifyPolice;

