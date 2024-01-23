const multer = require("multer");
const path = require("path");
const CustomError = require("../../helpers/error/CustomError");

// Storage, FileFilter

const storage = multer.diskStorage({
      destination: function(req,file,cb){
            const rootDir = path.dirname(require.main.filename);
            cb(null, path.join(rootDir, process.env.UPLOADS_DIR));
      },
      filename: function(req,file,cb){
            // File - MimeType - [image/jpg - image/png - image/gif]
            const extension = file.mimetype.split("/")[1];
            req.savedProfileImage = "image_" + req.user.id + "." + extension;
            cb(null, req.savedProfileImage);
      }
});

const fileFilter = (req,file,cb) => {
      let allowedMimeTypes = ["image/jpg", "image/png", "image/gif", "image/jpeg"];

      if(!allowedMimeTypes.includes(file.mimetype)){
            return cb(new CustomError("Geçersiz dosya tipi!", 400), false);
      }

      return cb(null, true);
}

const profileImageUpload = multer({storage, fileFilter});

module.exports = {
      profileImageUpload
}