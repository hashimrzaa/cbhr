import express from "express";
const router = express.Router();
import users from "./users.mjs";
import students from "./student.mjs";

router.use("/users", users);
router.use("/students", students);

export default router;

