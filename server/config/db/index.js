const mongoose = require("mongoose");
async function connect() {
  try {
    await mongoose.connect(
      "mongodb+srv://admin:admin@cluster0.nxcyn.mongodb.net/MERN_Project?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      }
    );
    console.log("Connect successfully!!");
  } catch (error) {
    console.log(error);
  }
}
module.exports = { connect };
