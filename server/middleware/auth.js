const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('No token, Authorization denied');
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
    } catch (err) {
        return res.status(400).json({ msg: 'Invalid token' });
        console.log(err);
    }

    next();
};

module.exports = auth;