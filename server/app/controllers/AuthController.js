const User = require("../models/User");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
class AuthController {
  register = async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password)
      return res
        .status(401)
        .json({ status: false, message: "Invalid username or password" });
    try {
      const user = await User.findOne({ username: username });
      if (user) {
        return res.status(400).json({ status: false, message: "User already" });
      }
      const hashPassword = await argon2.hash(password);
      const newUser = new User({
        username,
        password: hashPassword,
      });

      await newUser.save();
      const accessToken = jwt.sign(
        { userId: newUser._id },
        process.env.ACCESS_TOKEN
      );

      res.status(200).json({
        status: true,
        message: "Register Successfully",
        accessToken: accessToken,
      });
    } catch (e) {
      console.log(e);
    }
  };

  login = async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password)
      return res
        .status(400)
        .json({ status: false, message: "Username or/and Password wrong" });

    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        return res
          .status(400)
          .json({ status: false, message: "Not found user" });
      }

      const passwordValid = await argon2.verify(user.password, password);

      if (!passwordValid) {
        return res
          .status(400)
          .json({ status: false, message: "Password wrong" });
      }

      const accessToken = jwt.sign(
        { userId: user._id },
        process.env.ACCESS_TOKEN
      );

      res.status(200).json({
        status: true,
        message: "Login Successfully",
        accessToken: accessToken,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = new AuthController();
