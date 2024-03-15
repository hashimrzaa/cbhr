import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  courseName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  day:{
    type: String,
    required: true,
  }
});

const Students = mongoose.model("Students", StudentSchema);

export default Students;
