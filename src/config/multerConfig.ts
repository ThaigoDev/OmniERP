const multer = require("multer");
const path = require("path");

module.exports = {
  fileFilter: (req: any, file: any, cb: any) => {
    if (file.mimetype !== "image/png" && file.mimetype !== "image/jpeg") {
      return cb(new multer.MulterError("Arquivo Inválido !"));
    }
    return cb(null, true);
  },
  storage: multer.diskStorage({
    destination: (req: any, file: any, cb: any) => { 
        cb(null, path.resolve(__dirname, "..", "..", "public", "uploads")); 
    },
    filename: (res: any, file: any, cb: any) => { 
        cb(null, `${Date.now()}${path.extname(file.originalname)}`)
    },
  }),
};
