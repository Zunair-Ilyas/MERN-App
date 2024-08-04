const User = require('../Model/User-Schema')
const ConflictError = require("../Errors/ConflictError");


const UserExists = async (req, res, next) => {
    try{
        const {email} = req.body
        const user = await User.findOne({email})
        if(user) {
            throw new ConflictError('User already exists');
        }
        next()
    } catch (e) {
        if (e instanceof ConflictError) {
            res.status(e.statusCode).send({ error: e.message });
        } else {
            res.status(500).send({ error: 'Server error' });
        }
    }
}

module.exports = UserExists;