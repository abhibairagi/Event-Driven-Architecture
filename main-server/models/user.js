const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userModel = mongoose.Schema(
  {
    full_name: {
      type: String,
      default : "",
    },
    email: {
      type: String,
      requried: true,
    },
    password: {
      type: String,
      requried: true,
    },
    status : {
      type : Boolean, 
    }
  },
  {
    timestamps: true,
  }
);

userModel.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userModel.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports  = mongoose.model("User", userModel);
