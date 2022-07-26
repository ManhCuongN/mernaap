const express = require("express");
const router = express.Router();
const authController = require("../app/controllers/AuthController");
const homeController = require("../app/controllers/HomeController");
const authMiddleware = require("../app/middelwares/auth");

router.get("/", authMiddleware, homeController.index);
router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;
