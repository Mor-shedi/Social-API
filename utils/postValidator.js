const { check } = require("express-validator");
const validatorMiddleware = require("../middleware/validator.middleware");

exports.createPostValidator = [
  check("title").not().isEmpty().withMessage("Title is required"),
  check("message").not().isEmpty().withMessage("Message is required"),
  check("creator").not().isEmpty().withMessage("Creator is required"),
  check("tages").optional().isArray().withMessage("Tags must be an array"),
  check("selectedFile").optional(),
  check("likeCount").optional(),
  validatorMiddleware,
];

exports.getPostValidator = [
  check("postId").isMongoId().withMessage("Invalid Id"),
  validatorMiddleware,
];

exports.updatePostValidator = [
  check("postId").isMongoId().withMessage("Invalid Id"),
  validatorMiddleware,
];

exports.deletePostValidator = [
  check("postId").isMongoId().withMessage("Invalid Id"),
  validatorMiddleware,
];

exports.likePostValidator = [
  check("postId").isMongoId().withMessage("Invalid Id"),
  validatorMiddleware,
];
