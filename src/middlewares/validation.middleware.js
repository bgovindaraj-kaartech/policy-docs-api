const { param, body, validationResult } = require("express-validator");

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation failed",
      errors: errors.array().map((e) => ({
        field: e.param,
        message: e.msg,
      })),
    });
  }
  next();
};

exports.validateIdParam = [
  param("id").isInt({ min: 1 }).withMessage("id must be a positive integer"),
  handleValidation,
];

exports.validatePolicyBody = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("title is required")
    .isLength({ min: 3, max: 255 })
    .withMessage("title must be 3–255 characters"),

  body("description")
    .optional()
    .isString()
    .withMessage("description must be a string")
    .isLength({ max: 1000 })
    .withMessage("description must be under 1000 characters"),

  handleValidation,
];

exports.validatePolicyUpdate = [
  body("title")
    .optional()
    .trim()
    .isLength({ min: 3, max: 255 })
    .withMessage("title must be 3–255 characters"),

  body("description")
    .optional()
    .isString()
    .withMessage("description must be a string")
    .isLength({ max: 1000 })
    .withMessage("description must be under 1000 characters"),

  handleValidation,
];
