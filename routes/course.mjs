import express from "express";
import Course from "../models/Course.mjs";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const courses = await Course.find({});
    res.status(200).send({ data: courses });
  } catch (error) {
    res.status(404).send({ message: "Courses not found" });
  }
});
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const course = await Course.findById(id);
    res.status(200).send({ data: course });
  } catch (error) {
    res.status(404).send({ message: "Course not found" });
  }
});

router.post("/add", async (req, res) => {
    console.log(req.body);
  try {
    const course = await Course.create(req.body);
    res
      .status(201)
      .send({ message: "Course added successfully!", Course: course });
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedCourse = await Course.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedCourse) {
      return res.status(404).send({ message: "Course not found" });
    }
    res.send({
      message: "Course added successfully!",
      Course: updatedCourse,
    });
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCourse = await Course.findByIdAndDelete(id);
    if (!deletedCourse) {
      return res.status(404).send({ message: "Course not found" });
    }
    res.send({ message: "Course deleted successfully!" });
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
});

export default router;
