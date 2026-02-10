const multer = require("multer");

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const upload = multer({
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter(req, file, cb) {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files are allowed"));
    }
    cb(null, true);
  },
});

module.exports = upload;
