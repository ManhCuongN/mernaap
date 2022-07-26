const User = require("../models/User");
class HomeController {
  index = async (req, res) => {
    try {
      const user = await User.findById(req.userId).select("-password");
      if (!user)
        return res
          .status(400)
          .json({ status: false, message: "User not found" });
      return res.status(200).json({ status: true, user: user });
    } catch (error) {
      console.log(error);
    }
  };
}
module.exports = new HomeController();
