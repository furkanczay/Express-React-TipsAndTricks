const sendJwtToClient = (user, res) => {
      // JWT Generate
      const token = user.generateJwtFromUser();
      const { JWT_COOKIE_EXPIRE, NODE_ENV } = process.env;
      // Return Response
      return res
      .status(200)
      .cookie("access_token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + parseInt(JWT_COOKIE_EXPIRE) * 1000),
            secure: NODE_ENV === 'development' ? false : true
      })
      .json({
            success: true,
            accessToken: token,
            data: {
                  email: user.email,
            }
      })
}

module.exports = sendJwtToClient;