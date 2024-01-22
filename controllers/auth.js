const User = require('../models/User');
const CustomError = require('../helpers/error/customError');
const asyncErrorWrapper = require('express-async-handler');
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
    res.status(200).json({
        success: true,
        data: user
    })
});


const errorTest = (req, res, next) => {
    return next(new CustomError("Custom Error Message", 400));
}

module.exports = {
    register,
    errorTest,
}