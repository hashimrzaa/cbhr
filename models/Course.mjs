import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
    unique: true,
  },
  sirName: {
    type: String,
    required: true,
  },
  days: {
    type: String,
    required: true,
  },
});

const Courses = mongoose.model("courses", courseSchema);

export default Courses;
