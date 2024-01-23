const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

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
    },
    resetPasswordToken: {
        type: String,
    },
    resetPasswordExpire: {
        type: Date,
    }
});
// UserSchema Methods
UserSchema.methods.generateJwtFromUser = function(){
    const { JWT_SECRET_KEY, JWT_ACCESS_EXPIRE } = process.env; 
    const payload = {
        id: this._id,
        email: this.email,
    }

    const token = jwt.sign(payload, JWT_SECRET_KEY, {
        expiresIn: JWT_ACCESS_EXPIRE
    });
    return token;
}
UserSchema.methods.getResetPasswordTokenFromUser = function(){
    const randomHexString = crypto.randomBytes(18).toString("hex");
    const { RESET_PASSWORD_EXPIRE } = process.env;
    const resetPasswordToken = crypto.createHash("SHA256").update(randomHexString).digest("hex");
    this.resetPasswordToken = resetPasswordToken;
    this.resetPasswordExpire =  Date.now() + parseInt(RESET_PASSWORD_EXPIRE);
}

// Pre Hook
UserSchema.pre("save", function(next){
    // Parola değişmemişse hashlemeyi atla
    if(!this.isModified("password")){
        next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if(err) next(err);
        bcrypt.hash(this.password, salt, (err, hash) => {
            if(err) next(err);
            this.password = hash;
            next();
        });
    });
})

module.exports = mongoose.model("User", UserSchema);