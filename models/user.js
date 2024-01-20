const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const user = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

user.methods.hashPassword = function () {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(this.password, salt);
  this.password = hash;
};
user.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};


module.exports = mongoose.model("User", user);
