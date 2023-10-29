const express = require("express");
const router = express.Router();

const {
  createPostValidator,
  updatePostValidator,
  deletePostValidator,
  likePostValidator,
  getPostValidator,
} = require("../utils/postValidator");

const {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
  likePost,
} = require("../controller/post.controller");

router.route("/").post(createPostValidator, createPost).get(getPosts);

router
  .route("/:postId")
  .get(getPostValidator, getPost)
  .patch(updatePostValidator, updatePost)
  .delete(deletePostValidator, deletePost);

router.route("/:postId/like").patch(likePostValidator, likePost);

module.exports = router;
