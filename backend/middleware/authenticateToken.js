const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    console.log('in autheniticatetoken');
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access denied, no token provided' });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // Attach user data from token
        console.log('Decoded token:', verified);
        console.log('User ID- athtoken:', req.user);
        next();
    } catch (error) {
        res.status(403).json({ message: 'Invalid token' });
    }
};

module.exports = authenticateToken;