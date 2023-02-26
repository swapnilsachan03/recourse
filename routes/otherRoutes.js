import express from "express";
import { contact, courseRequest, getDashboardStats } from "../controllers/otherControllers.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// Contact form
router.route("/contact").post(contact);

// Request form
router.route("/courseRequest").post(courseRequest);

// Get admin Dashboard stats
router.route("/admin/stats").get(isAuthenticated, authorizeAdmin, getDashboardStats);

export default router;