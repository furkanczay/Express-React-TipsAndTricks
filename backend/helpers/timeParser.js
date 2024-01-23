function parseJwtCookieExpire(expireString) {
      const regex = /^(\d+)([smhd])$/;
      const match = expireString.match(regex);
    
      if (!match) {
        throw new Error("Geçersiz JWT_COOKIE_EXPIRE formatı");
      }
    
      const value = parseInt(match[1]);
      const unit = match[2];
    
      switch (unit) {
        case 's': // saniye
          return value * 1000;
        case 'm': // dakika
          return value * 1000 * 60;
        case 'h': // saat
          return value * 1000 * 60 * 60;
        case 'd': // gün
          return value * 1000 * 60 * 60 * 24;
        default:
          throw new Error("Geçersiz birim (s/m/h/d) JWT_COOKIE_EXPIRE değerinde");
      }
}


module.exports = {
      parseJwtCookieExpire
}