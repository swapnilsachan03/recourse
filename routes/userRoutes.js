import express from "express";
import { addToPlaylist, changePassword, changeUserRole, deleteMyProfile, deleteUser, forgotPassword, getAllUsers, getMyProfile, login, logout, register, removeFromPlaylist, resetPassword, updateProfile, updateProfilePicture } from "../controllers/userController.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js"

const router = express.Router();

// To register a new user
router.route("/register").post(singleUpload, register);

// Login
router.route("/login").post(login);

// Logout
router.route("/logout").get(logout);

// Get my profile
router.route("/getProfile").get(isAuthenticated, getMyProfile);

// Delete my profile
router.route("/deleteMyProfile").delete(isAuthenticated, deleteMyProfile);

// Change password
router.route("/changePassword").put(isAuthenticated, changePassword);

// Update profile
router.route("/updateProfile").put(isAuthenticated, updateProfile);

// Update profile picture
router.route("/updateProfilePicture").put(isAuthenticated, singleUpload, updateProfilePicture);

// Forget password
router.route("/forgotPassword").post(forgotPassword);

// Reset password
router.route("/resetPassword/:token").put(resetPassword);

// Add to playlist
router.route("/addToPlaylist").post(isAuthenticated, addToPlaylist);

// Remove from playlist
router.route("/removeFromPlaylist").delete(isAuthenticated, removeFromPlaylist);

// Admin Routes ---------------------------------------------------------------

router.route("/admin/getAllUsers").get(isAuthenticated, authorizeAdmin, getAllUsers)

router
  .route("/admin/user/:id")
  .put(isAuthenticated, authorizeAdmin, changeUserRole)
  .delete(isAuthenticated, authorizeAdmin, deleteUser)

export default router;