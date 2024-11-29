const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const access_token_secret_key = process.env.ACCESS_TOKEN_SECRET_KEY;

        const decoded = jwt.verify(token, access_token_secret_key);
        req.id = decoded.id;
        req.phone = decoded.phone;
        req.role = decoded.role;
        next();
      } catch (error) {
        return res.status(401).json({ message: 'Authentication failed' });
      }
};