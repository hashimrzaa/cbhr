import express from "express";
import Students from "../models/Student.mjs";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const std = await Students.find({});
    res.status(200).send({ data: std });
  } catch (error) {
    res.status(404).send({ message: "Students not found" });
  }
});
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const std = await Students.findById(id);
    res.status(200).send({ data: std });
  } catch (error) {
    res.status(404).send({ message: "Student not found" });
  }
});

router.post("/add", async (req, res) => {
  try {
    const student = await Students.create(req.body);
    res
      .status(201)
      .send({ message: "Student added successfully!", student: student });
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedStudent = await Students.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedStudent) {
      return res.status(404).send({ message: "Student not found" });
    }
    res.send({
      message: "Student added successfully!",
      student: updatedStudent,
    });
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedStudent = await Students.findByIdAndDelete(id);
    if (!deletedStudent) {
      return res.status(404).send({ message: "Student not found" });
    }
    res.send({ message: "Student deleted successfully!" });
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
});

export default router;
