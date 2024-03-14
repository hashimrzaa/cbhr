import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/enviroment.mjs";

const usersSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  type: {
    String,
    required: true,
  },
  tokens: {
    default: [],
    type: [],
  },
});

usersSchema.pre("save", function (next) {
  const user = this;

  if (user.isModified("password")) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);

    user.password = hash;
  }

  next();
});

usersSchema.methods.comparePassword = function (password) {
  const user = this;

  return bcrypt.compareSync(password, user.password);
};

usersSchema.methods.generateToken = function () {
  const { _id } = this;
  const token = jwt.sign({ _id }, JWT_SECRET);

  return token;
};

const Users = mongoose.model("users", usersSchema);

export default Users;
