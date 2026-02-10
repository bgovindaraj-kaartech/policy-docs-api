const service = require("../services/policy.service");

exports.uploadPolicy = async (req, res, next) => {
  try {
    if (!req.file) throw new Error("PDF file is required");

    const base64File = req.file.buffer.toString("base64");

    const policy = await service.createPolicy({
      title: req.body.title,
      description: req.body.description,
      file_name: req.file.originalname,
      file_data: base64File,
      file_size: req.file.size,
    });

    res.status(201).json(policy);
  } catch (err) {
    next(err);
  }
};

exports.getPolicies = async (req, res, next) => {
  try {
    res.json(await service.getAllPolicies());
  } catch (err) {
    next(err);
  }
};

exports.getPolicy = async (req, res, next) => {
  try {
    const policy = await service.getPolicyById(req.params.id);
    if (!policy) return res.status(404).json({ message: "Not found" });
    res.json(policy);
  } catch (err) {
    next(err);
  }
};

exports.updatePolicy = async (req, res, next) => {
  try {
    const { title, description } = req.body || {};
    const hasFile = !!req.file;

    if (!title && !description && !hasFile) {
      return res.status(400).json({
        success: false,
        message: 'Nothing to update. Provide title, description, or a new PDF file.',
      });
    }

    let fileData = null;
    if (hasFile) {
      fileData = {
        file_name: req.file.originalname,
        file_data: req.file.buffer.toString('base64'),
        file_size: req.file.size,
      };
    }

    const updatedPolicy = await service.updatePolicy(
      req.params.id,
      title,
      description,
      fileData
    );

    if (!updatedPolicy) {
      return res.status(404).json({
        success: false,
        message: 'Policy file not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Policy updated successfully',
      data: updatedPolicy,
    });
  } catch (err) {
    next(err);
  }
};


exports.deletePolicy = async (req, res, next) => {
  try {
    const deleted = await service.deletePolicy(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Policy file not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Policy deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

exports.downloadPolicy = async (req, res, next) => {
  try {
    const policy = await service.getPolicyById(req.params.id);
    if (!policy) return res.status(404).json({ message: "Not found" });

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${policy.file_name}"`,
    });

    res.send(Buffer.from(policy.file_data, "base64"));
  } catch (err) {
    next(err);
  }
};
