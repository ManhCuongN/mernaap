const authRoute = require("./auth");
const postRoute = require("./post");

function router(app) {
  app.use("/auth", authRoute);
  app.use("/post", postRoute);
}

module.exports = router;
