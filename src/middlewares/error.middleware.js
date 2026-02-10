const multer = require('multer');

module.exports = (err, req, res, next) => {
  // Multer-specific errors
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        error: 'File size exceeds 5MB limit',
      });
    }
  }

  // Custom file filter errors
  if (err.message === 'Only PDF files are allowed') {
    return res.status(400).json({
      error: err.message,
    });
  }

  // Fallback
  res.status(400).json({
    error: err.message || 'Bad Request',
  });
};
