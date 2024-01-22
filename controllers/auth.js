const User = require('../models/User');
const CustomError = require('../helpers/error/customError');
const asyncErrorWrapper = require('express-async-handler');
const { sendJwtToClient } = require('../helpers/authorization/tokenHelpers');
const { validateUserInput, comparePassword } = require('../helpers/input/inputHelpers');
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

const login = asyncErrorWrapper(async (req, res, next) => {
    const { email, password } = req.body;
    if(!validateUserInput(email, password)){
        return next(new CustomError("Lütfen gönderdiğiniz bilgileri kontrol ediniz", 400))
    }

    const user = await User.findOne({email}).select("+password");
    if(!comparePassword(password, user.password)){
        return next(new CustomError("Bilgiler hatalı, lütfen kontrol ediniz", 400))
    }
    sendJwtToClient(user, res);
});

const logout = asyncErrorWrapper(async (req, res, next) => {
    const { NODE_ENV } = process.env;
    return res.status(200).cookie("access_token", "",{
        httpOnly: true,
        expires: new Date(Date.now()),
        secure: NODE_ENV === 'development' ? false: true
    }).json({
        success: true,
        message: "Başarıyla çıkış yapıldı!"
    })
});

const getUser = (req, res, next) => {
    res.json({
        success: true,
        data: {
            id: req.user.id,
            email: req.user.email,
        }
    })
}

const imageUpload = asyncErrorWrapper(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.user.id, {
        profileImage: req.savedProfileImage
    }, {
        new: true,
        runValidators: true
    })

    res.status(200).json({
        success: true,
        message: "Resim başarıyla yüklendi",
        data: user
    })
});


module.exports = {
    register,
    getUser,
    login,
    logout,
    imageUpload,
}