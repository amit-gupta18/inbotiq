const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    const cookies = req.cookies || {};
    const token = cookies.token || cookies.authToken || null;
    if (!token) {
        return res.status(401).json({ error: 'No authentication token provided' });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = payload;
        return next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid or expired authentication token' });
    }
}



module.exports = { authMiddleware };