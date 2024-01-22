const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: [true, "Lütfen adınızı belirtiniz."],
        minlength: [2, "Adınız en az 2 karakter olmalıdır."]
    },
    lastName: {
        type: String,
        required: [true, "Lütfen soyadınızı belirtiniz."],
        minlength: [2, "Soyadınız en az 2 karakter olmalıdır."]
    },
    email: {
        type: String,
        required: [true, "Lütfen email adresinizi belirtiniz."],
        unique: true,
        match: [
            /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
            "Lütfen geçerli bir email adresi giriniz."
        ]
    },
    username: {
        type: String,
        required: [true, "Lütfen kullanıcı adınızı belirtiniz."],
        unique: true,
        minlength: [3, "Kullanıcı adınız en az 2 karakter olmalıdır."]
    },
    password: {
        type: String,
        minlength: [8, "Şifreniz en az 8 karakterden oluşmalıdır."],
        required: [true, "Lütfen şifrenizi belirtiniz."],
        select: false,
        match: [
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/,
            "Şifre en az bir büyük harf, bir küçük harf, bir rakam ve bir özel karakter içermelidir."
        ]
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String
    },
    about: {
        type: String
    },
    place: {
        type: String
    },
    website: {
        type: String
    },
    profileImage: {
        type: String,
        default: "default.jpg"
    },
    blocked: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("User", UserSchema);