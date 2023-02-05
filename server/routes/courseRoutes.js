import express from "express";
import { addLecture, createCourse, deleteCourse, deleteLecture, getAllCourses, getCourseLectures } from "../controllers/courseController.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js";

const router = express.Router();

// Get all courses without lectures
router.route("/courses").get(getAllCourses);

// Create new courses (admin only)
router
  .route("/createCourse")
  .post(isAuthenticated, authorizeAdmin, singleUpload, createCourse);

// Get course details, add lecture, delete course
router
  .route("/course/:id")
  .get(isAuthenticated, getCourseLectures)
  .post(isAuthenticated, authorizeAdmin, singleUpload, addLecture)
  .delete(isAuthenticated, authorizeAdmin, deleteCourse)

// Delete lectures
router
  .route("/lecture")
  .delete(isAuthenticated, authorizeAdmin, deleteLecture);

export default router;