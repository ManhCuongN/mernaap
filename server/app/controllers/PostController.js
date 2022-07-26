const Post = require("../models/Post");
const User = require("../models/User");

class PostController {
  createPost = async (req, res, next) => {
    const { title, description, url, status, user } = req.body;
    if (!title)
      return res.status(400).json({ status: false, message: "Invalid title" });

    try {
      const newPost = new Post({
        title,
        description,
        url: url.startsWith("https://") ? url : `https://${url}`,
        status: status || "TO LEARN",
        user: "62da27cf6d6d4545202b0e3b",
      });

      await newPost.save();
      res
        .status(200)
        .json({ status: true, message: "Happy Learning", post: newPost });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: false, message: "Invalid Server " });
    }
  };

  //GET POST
  getPost = async (req, res, next) => {
    try {
      const posts = await Post.find({ user: req.userId }).populate("user");
      res.status(200).json({ status: true, posts: posts });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: false, message: "Invalid Server " });
    }
  };

  // Update Post

  updatePost = async (req, res, next) => {
    const { title, description, url, status } = req.body;
    if (!title)
      return res.status(400).json({ status: false, message: "Invalid title" });

    try {
      let newPost = {
        title,
        description: description || "",
        url: (url.startsWith("https://") ? url : `https://${url}`) || "",
        status: status || "TO LEARN",
      };

      const updatePostCondition = { _id: req.params.id, user: req.userId };

      newPost = await Post.findOneAndUpdate(updatePostCondition, newPost, {
        new: true,
      });

      if (!newPost) {
        return res
          .status(404)
          .json({ status: false, message: "Post not found or invalid user" });
      }

      res.status(200).json({
        status: true,
        message: "Happy Update Success",
        post: newPost,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: false, message: "Invalid Server " });
    }
  };

  //Delete
  deletePost = async (req, res) => {
    try {
      const deletePostCondition = { _id: req.params.id, user: req.userId };
      const deletePost = await Post.findOneAndDelete(deletePostCondition);

      if (!deletePost) {
        return res.status(404).json({
          status: false,
          message: "Post not found and user not found",
        });
      }
      res.status(200).json({
        status: true,
        message: "Delete post successfully",
        post: deletePost,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: false, message: "Invalid Server " });
    }
  };
}
module.exports = new PostController();
