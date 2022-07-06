const config = require('config');
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    
    let token = req.header('Authorization')
    if (!token) return res.status(401).send('Access denied. No token provided.');

    token = token.split(' ')
    token = token[1];
    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decoded;
        next();
    } 
    catch (ex) {
        res.status(400).send('Invalid token.');
    }
}
