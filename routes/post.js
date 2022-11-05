const express = require("express");
const router = express.Router();
const { upload } = require("../multer");

const Post = require("../controllers/Post");

router.get("/", Post.getPosts);
router.get("/:id", Post.getPostById);
router.get("/categoryname/:name", Post.getPostByCategoryName);
router.post("/", upload.single("image"), Post.savePost);
router.put("/:id", upload.single("image"), Post.updatePost);
router.patch("/:id", upload.single("image"), Post.updatePost);
router.delete("/:id", Post.deletePost);

module.exports = router;
