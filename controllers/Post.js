const fs = require("fs");
const Category = require("../models/Category");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const slugify = require("slugify");

// GET ALL
const getPosts = async (req, res) => {
  const title = req.query.q;
  const slug = req.query.slug;
  const category = req.query.category;

  // GET POST BY SLUG
  if (slug !== undefined) {
    try {
      const post = await Post.findOne()
        .select("_id title category content description image slug createdAt")
        .where("slug")
        .equals(slug)
        .populate({ path: "category", select: "_id name" });
      res.status(200).json(post);
    } catch (err) {
      res.status(400).json({
        message: err.message,
      });
    }

    // GET POST BY CATEGORY ID
  } else if (category !== undefined) {
    try {
      const post = await Post.find()
        .select("_id title category content description image slug createdAt")
        .where("category")
        .equals(category)
        .populate({ path: "category", select: "_id name" })
        .sort("-createdAt");
      res.status(200).json({
        posts: post,
        total_posts: post.length
      });
    } catch (err) {
      res.status(400).json({
        message: err.message,
      });
    }

    // GET ALL POST & GET POST BY TITLE
  } else {
    let condition = title
      ? { title: { $regex: new RegExp(title), $options: "i" } }
      : {};

    try {
      const post = await Post.find(condition)
        .select("_id title category content description image slug createdAt")
        .populate({ path: "category", select: "_id name" })
        .sort("-createdAt");
      res.status(200).json({
        posts: post,
        total_posts: post.length
      });
    } catch (err) {
      res.status(400).json({
        message: err.message,
      });
    }
  }
};

// GET ONE
const getPostById = async (req, res) => {
  try {
    const post = await Post.findById({ _id: req.params.id })
      .select("_id title category content description image slug createdAt")
      .populate({ path: "category", select: "_id name" });
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

// GET POST BY CATEGORY NAME
const getPostByCategoryName = async (req, res) => {
  // GET Category Id
  const name = req.params.name;
  const categories = await Category.find({ name: { $regex: new RegExp(name), $options: "i" } });
  const categoryId = categories[0]._id;

  try {
    const post = await Post.find({})
      .where('category').equals(categoryId)
      .select("_id title category content description image slug createdAt")
      .populate({ path: "category", select: "_id name" });
    res.status(200).json({
      posts: post,
      total_posts: post.length
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

// CREATE
const savePost = async (req, res) => {
  if (req.files === null)
    return res.status(400).json({ msg: "No File Uploaded" });

  const imageUrl = `${req.protocol}://${req.get("host")}/${req.file.filename}`;

  const createPost = new Post({
    title: req.body.title,
    content: req.body.content,
    description: req.body.description,
    category: req.body.category,
    slug: slugify(req.body.title),
    image: imageUrl,
  });
  try {
    const post = await createPost.save();
    res.status(201).json({ message: "Post Created Successfuly" });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

// UPDATE
const updatePost = async (req, res) => {
  const postById = await Post.findById({ _id: req.params.id });
  // Check Image
  if (req.file == undefined) {
    try {
      const postUpdate = await Post.updateOne(
        { _id: req.params.id },
        {
          title: req.body.title,
          content: req.body.content,
          description: req.body.description,
          category: req.body.category,
          slug: slugify(req.body.title),
        }
      );
      res.status(201).json({ message: "Post Updated Successfuly" });
    } catch (err) {
      res.status(400).json({
        message: err.message,
      });
    }
  } else {
    try {
      const imageUrl = `${req.protocol}://${req.get("host")}/${req.file.filename}`;
      const postUpdate = await Post.updateOne(
        { _id: req.params.id },
        {
          title: req.body.title,
          content: req.body.content,
          description: req.body.description,
          category: req.body.category,
          slug: slugify(req.body.title),
          image: imageUrl,
        }
      );
      // Delete old image
      const filepath = `./uploads/${postById.image}`;
      fs.unlinkSync(filepath);
      res.status(201).json({ message: "Post Updated Successfuly" });
    } catch (err) {
      res.status(400).json({
        message: err.message,
      });
    }
  }
};

// DELETE
const deletePost = async (req, res) => {
  try {
    // Delete Post by id
    const postDelete = await Post.deleteOne({ _id: req.params.id });
    // Delete All Comment by Post id
    const commentDelete = await Comment.deleteMany({ post: req.params.id });
    res.status(200).json({ message: "Post successfully deleted !" });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

module.exports = {
  getPosts,
  getPostById,
  savePost,
  updatePost,
  deletePost,
  getPostByCategoryName
};
