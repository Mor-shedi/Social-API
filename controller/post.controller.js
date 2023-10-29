const Post = require("../model/post.model");
const ApiError = require("../utils/apiError");
const asyncHandler = require("express-async-handler");

exports.getPosts = async (req, res, next) => {
  const posts = await Post.find();
  return res.status(200).json({
    success: true,
    data: posts,
  });
};

exports.createPost = asyncHandler(async (req, res, next) => {
  const post = await Post.create(req.body);
  if (!post) {
    return next(new ApiError(404, "Post not found"));
  }
  return res.status(201).json({ success: true, data: post });
});

exports.getPost = asyncHandler(async (req, res, next) => {
  const { postId } = req.params;
  const post = await Post.findById(postId);
  if (!post) {
    return next(new ApiError(404, "Invalid Id"));
  }
  return res.status(200).json({ success: true, data: post });
});

exports.updatePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findByIdAndUpdate(req.params.postId, req.body, {
    new: true,
  });
  if (!post) {
    return next(new ApiError(404, "Can not find this id"));
  }
  return res.status(200).json({ status: true, data: post });
});

exports.deletePost = asyncHandler(async (req, res, next) => {
  const { postId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(postId))
    return next(new ApiError(404, "No post with this Id"));
  const deletedPost = await Post.findByIdAndDelete(postId);
  return res.status(204, { msg: "deleted Successful" });
});

exports.likePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.postId);
  if (!post) {
    return next(new ApiError(404, "Can not find this id"));
  }
  post.likeCount = post.likeCount + 1;
  await post.save();
  return res.status(200).json({ status: true, data: post });
});
