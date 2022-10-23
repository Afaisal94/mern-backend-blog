const Comment = require("../models/Comment");

// GET ALL
const getComments = async (req, res) => {
  try {
    const comments = await Comment.find()
      .select("_id comment post")
      .populate({ path: "post", select: "_id title" });
    const totalComment = await Comment.find();
    res.status(200).json({
      comments: comments,
      total_comments: totalComment.length,
    });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

// GET ONE
const getCommentById = async (req, res) => {
  try {
    const comment = await Comment.findById({ _id: req.params.id })
      .select("_id comment post")
      .populate({ path: "post", select: "_id title" });
    res.status(200).json(comment);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

// GET BY POST
const getCommentByPost = async (req, res) => {
  try {
    const comment = await Comment.find({ "post": req.params.id }).select(
      "_id comment"
    );
    res.status(200).json(comment);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

// CREATE
const saveComment = async (req, res) => {
  const commentPost = new Comment({
    comment: req.body.comment,
    post: req.body.post,
  });

  try {
    const comment = await commentPost.save();
    res.status(201).json(comment);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

// DELETE
const deleteComment = async (req, res) => {
  try {
    const data = await Comment.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Comment successfully deleted !" });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

module.exports = {
  getComments,
  getCommentById,
  getCommentByPost,
  saveComment,
  deleteComment,
};
