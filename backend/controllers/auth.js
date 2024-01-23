const User = require('../models/User');
const CustomError = require('../helpers/error/customError');
const asyncErrorWrapper = require('express-async-handler');
const { sendJwtToClient } = require('../helpers/authorization/tokenHelpers');
const { validateUserInput, comparePassword } = require('../helpers/input/inputHelpers');
const sendEmail = require("../helpers/libs/sendEmail");
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

// Şifremi Unuttum
const forgotPassword = asyncErrorWrapper(async (req, res, next) => {
    const resetEmail = req.body.email;
    const user = await User.findOne({email: resetEmail});
    if(!user) {
        return next(new CustomError("Böyle bir kullanıcı bulunamadı", 400));
    }
    const resetPasswordToken = user.getResetPasswordTokenFromUser();
    await user.save();

    const resetPasswordUrl = `${process.env.BASE_URL}${process.env.API_PATH}/auth/reset-password?resetPasswordToken=${resetPasswordToken}`

    const emailTemplate = `
        <h3>Şifreyi Sıfırla</h3>
        <p> Bu <a href='${resetPasswordUrl}' target='_blank'> bağlantıya </a> tıklayarak, 1 saat içerisinde şifrenizi sıfırlayabilirsiniz </p>
    `

    try{
        await sendEmail({
            from: process.env.SMTP_USER,
            to: resetEmail,
            subject: "Şifre Sıfırlama",
            html: emailTemplate
        });
        res.status(200).json({
            success: true,
            message: "E-posta adresinize şifre sıfırlama bağlantısı gönderildi"
        })
    }catch(err){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();
        return next(new CustomError("E-posta gönderimi esnasında hata oluştu", 500))
    }

    
    
});


module.exports = {
    register,
    getUser,
    login,
    logout,
    imageUpload,
    forgotPassword
}