const jwt = require('jsonwebtoken');
const statusCode = require('http-status-codes')

const AuthenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(statusCode.UNAUTHORIZED).json({message:'Not authorized'});
    }
    const token = authHeader.split(' ')[1];
    try {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            req.user = decoded;
            next()
        })
    } catch (e) {
        res.status(statusCode.INTERNAL_SERVER_ERROR).send({error: e});
    }
}

module.exports = AuthenticateToken;