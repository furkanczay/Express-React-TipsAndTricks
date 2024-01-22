const User = require('../models/User');
const CustomError = require('../helpers/error/customError');
const asyncErrorWrapper = require('express-async-handler');
const sendJwtToClient = require('../helpers/authorization/sendJwtToClient');
const register = asyncErrorWrapper(async (req, res, next) => {

    const { firstName, lastName, username , email, password, role } = req.body;
    const user = await User.create({
        firstName,
        lastName,
        username,
        email,
        password,
        role
    });

    sendJwtToClient(user, res)
});


const errorTest = (req, res, next) => {
    return next(new CustomError("Custom Error Message", 400));
}

module.exports = {
    register,
    errorTest,
}