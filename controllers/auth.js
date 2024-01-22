const User = require('../models/User');
const CustomError = require('../helpers/error/customError');
const asyncErrorWrapper = require('express-async-handler');
const {sendJwtToClient} = require('../helpers/authorization/tokenHelpers');
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


const tokenTest = (req, res, next) => {
    res.json({
        success: true,
        message: "Hoşgeldin"
    })
}

module.exports = {
    register,
    tokenTest,
}