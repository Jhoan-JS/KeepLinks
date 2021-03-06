const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now() }
});

UserSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);

  return await bcrypt.hash(password, salt);
};
UserSchema.methods.validPassword = async function (inputPassword) {
  const result = await bcrypt.compare(inputPassword, this.password);

  console.log(result);
  return result;
};

module.exports = mongoose.model("User", UserSchema);
