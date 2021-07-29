const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_URL || "mongodb://localhost:27017/KeepLinks", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then((db) => {
    console.log("DB is connected");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = mongoose;
