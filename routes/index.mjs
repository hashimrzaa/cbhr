import express from "express";
const router = express.Router();
import users from "./users.mjs";
import students from "./student.mjs";
import Courses from "./course.mjs";

router.use("/users", users);
router.use("/students", students);
router.use("/courses", Courses);

export default router;

