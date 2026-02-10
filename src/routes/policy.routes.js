const express = require("express");
const upload = require("../middlewares/upload.middleware");
const controller = require("../controllers/policy.controller");
const {
  validateIdParam,
  validatePolicyUpdate,
  validatePolicyBody,
} = require('../middlewares/validation.middleware');


const router = express.Router();

router.post(
  "/",
  upload.single("file"),
  validatePolicyBody,
  controller.uploadPolicy,
);
router.get("/", controller.getPolicies);
router.get("/:id", validateIdParam, controller.getPolicy);
router.put(
  '/:id',
  upload.single('file'),
  validateIdParam,
  validatePolicyUpdate,
  controller.updatePolicy
);

router.delete("/:id", validateIdParam, controller.deletePolicy);
router.get("/:id/download", validateIdParam, controller.downloadPolicy);

module.exports = router;
