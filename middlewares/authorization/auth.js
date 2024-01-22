const CustomError = require('../../helpers/error/CustomError');
const jwt = require('jsonwebtoken');
const { isTokenIncluded, getAccessTokenFromHeader } = require("../../helpers/authorization/tokenHelpers");

const getAccessToRoute = (req,res,next) => {
      const { JWT_SECRET_KEY } = process.env;
      // Token Kontrol Et
      // Custom Error ile hata durumlarını ele al
      if(!isTokenIncluded(req)){
            return next(new CustomError("Geçersiz erişim anahtarı!", 401))
      }
      const accessToken = getAccessTokenFromHeader(req);
      jwt.verify(accessToken, JWT_SECRET_KEY, (err, decoded) => {
            if(err) {
                  return next(new CustomError("Geçersiz erişim anahtarı", 401));
            }
            req.user = {
                  id: decoded.id,
                  email: decoded.email,
            }
            next();
      });    
}

module.exports = {
      getAccessToRoute
}