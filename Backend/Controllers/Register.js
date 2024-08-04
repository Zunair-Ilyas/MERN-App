const jwt = require("jsonwebtoken");
const User = require('../Model/User-Schema');
const statusCode = require('http-status-codes');
const bcrypt = require('bcryptjs');
const sendEmail = require('./email');

const bcryptSalt = bcrypt.genSaltSync(10);

const register = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        const hashedPassword = bcrypt.hashSync(password, bcryptSalt);
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });

        await sendEmail(
            email,
            'Registration Successful',
            'Thank you for registering with us!'
        );

        jwt.sign({ user }, process.env.JWT_SECRET, {}, (err, token) => {
            if (err) {
                return res.status(statusCode.UNAUTHORIZED).json({ message: "Error creating token" });
            }
            res.status(statusCode.CREATED).json({ message: "User Created", token, user });
        });

    } catch (e) {
        console.error(e);
        res.status(statusCode.INTERNAL_SERVER_ERROR).json({ error: e.message });
    }
};

module.exports = register;
