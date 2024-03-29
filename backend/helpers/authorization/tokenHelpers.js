const { parseJwtCookieExpire } = require("../timeParser");

const sendJwtToClient = (user, res) => {
      // JWT Generate
      const token = user.generateJwtFromUser();
      const { JWT_COOKIE_EXPIRE, NODE_ENV } = process.env;
      const expireMs = parseJwtCookieExpire(JWT_COOKIE_EXPIRE);
      // Return Response
      return res
      .status(200)
      .cookie("access_token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + expireMs),
            secure: NODE_ENV === 'development' ? false : true
      })
      .json({
            success: true,
            accessToken: token,
            data: {
                  id: user._id,
                  email: user.email,
            }
      })
}

const isTokenIncluded = (req) => {
      return req.headers.authorization && req.headers.authorization.startsWith("Bearer");
}

const getAccessTokenFromHeader = (req) => {
      const authorization = req.headers.authorization;
      const accessToken = authorization.split(" ")[1];
      return accessToken;
}

module.exports = {
      sendJwtToClient,
      isTokenIncluded,
      getAccessTokenFromHeader
};