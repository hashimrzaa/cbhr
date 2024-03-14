import mongoose from "mongoose";
import { MONGO_URI } from "./enviroment.mjs";

const ConnectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};
export default ConnectDB;
