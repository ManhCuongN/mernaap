const express = require("express");
const router = express.Router();

const postController = require("../app/controllers/PostController");
const authMiddleware = require("../app/middelwares/auth");

router.get("/get", authMiddleware, postController.getPost);
router.post("/create", authMiddleware, postController.createPost);
router.put("/:id", authMiddleware, postController.updatePost);
router.delete("/:id", authMiddleware, postController.deletePost);

module.exports = router;
