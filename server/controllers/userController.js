import crypto from "crypto";
import cloudinary from "cloudinary";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import { User } from "../models/User.js";
import { Course } from "../models/Course.js";
import { sendToken } from "../utils/sendToken.js";
import { sendEmail } from "../utils/sendEmail.js";
import getDataURI from "../utils/dataURI.js";
import { Stats } from "../models/Stats.js";

export const register = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  const file = req.file;

  if(!name || !email || !password) {
    return next(new ErrorHandler(
      "Please enter all fields", 400
    ))
  }

  let user = await User.findOne({ email });
  if(user) {
    return next(new ErrorHandler(
      "User already exists!", 409
    ))
  }

  const fileURI = getDataURI(file);
  const myCloud = await cloudinary.v2.uploader.upload(fileURI.content);

  user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url
    }
  });

  sendToken(res, user, "Registered successfully!", 201)
})

export const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if(!email || !password) {
    return next(new ErrorHandler(
      "Please enter all fields", 400
    ))
  }

  const user = await User.findOne({ email }).select("+password");
  if(!user) {
    return next(new ErrorHandler(
      "Incorrect email or password!", 401
    ))
  }

  const passwordIsMatched = await user.comparePassword(password);
  if(!passwordIsMatched) {
    return next(new ErrorHandler(
      "Incorrect password!", 401
    ))
  }

  sendToken(res, user, `Welcome back, ${user.name}`, 201);
})

export const logout = catchAsyncError(async (req, res, next) => {
  res
    .clearCookie("token");
  
  res
    .status(200)
    .json({
      success: true,
      message: "Logged out successfully."
    });
})

export const getMyProfile = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  res
    .status(200)
    .json({
      success: true,
      user
    })
})

export const deleteMyProfile = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  await cloudinary.v2.uploader.destroy(user.avatar.public_id);

  // Cancel subscription
  
  await user.delete();

  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now())
    })
    .json({
      success: true,
      message: "Profile deleted successfully"
    })
})

export const changePassword = catchAsyncError(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  const user = await User.findById(req.user._id).select("+password");

  if(!newPassword || !oldPassword) {
    return next(new ErrorHandler("Please enter both passwords", 400));
  }

  const passwordIsMatched = await user.comparePassword(oldPassword);
  if(!passwordIsMatched) {
    return next(new ErrorHandler("Incorrect old password", 400));
  }

  user.password = newPassword;
  await user.save();

  res
    .status(200)
    .json({
      success: true,
      message: "Password updated succefully!"
    })
})

export const updateProfile = catchAsyncError(async (req, res, next) => {
  const { name, email } = req.body;
  const user = await User.findById(req.user._id).select("+password");

  if(!name && !email) {
    return next(new ErrorHandler("Please enter at least one detail", 400));
  }

  if(name) user.name = name;
  if(email) user.email = email;
  await user.save();

  res
    .status(200)
    .json({
      success: true,
      message: "Profile updated succefully!"
    })
})

export const updateProfilePicture = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const file = req.file;
  
  const fileURI = getDataURI(file);
  const myCloud = await cloudinary.v2.uploader.upload(fileURI.content);

  await cloudinary.v2.uploader.destroy(user.avatar.public_id);
  user.avatar = {
    public_id: myCloud.public_id,
    url: myCloud.secure_url
  }

  await user.save();

  res
    .status(200)
    .json({
      success: true,
      message: "Profile picture updated succefully!"
    })
})

export const forgotPassword = catchAsyncError(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if(!user) {
    return next(new ErrorHandler("User is not registered", 400));
  }

  const resetToken = await user.getResetToken();
  await user.save();

  // Send token via e-mail
  const url = `${process.env.FRONTEND_URL}/reset_password/${resetToken}`
  const message = `Here's the link to reset your reCourse account password: ${url}. This link is valid only for 15 minutes. If you've not initiated the password reset request, please ignore.`
  await sendEmail(user.email, "reCourse Password Reset link", message)

  res
    .status(200)
    .json({
      success: true,
      message: `Reset token sent to ${user.email}`
    })
})

export const resetPassword = catchAsyncError(async (req, res, next) => {
  const { token } = req.params;

  const resetPasswordToken = crypto
  .createHash("sha256")
  .update(token)
  .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: {
      $gt: Date.now()
    }
  });

  if(!user) {
    return next(new ErrorHandler("Reset password link either invalid or expired.", 400))
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();
  
  res
    .status(200)
    .json({
      success: true,
      message: "Password changed succefully!"
    })
})

export const addToPlaylist = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const course = await Course.findById(req.body.id);

  if(!course) {
    return next(new ErrorHandler("Invalid course ID.", 404));
  }

  const itemExists = user.playlist.find((item) => {
    if(item.course.toString() === course._id.toString()) {
      return true;
    }
  });

  if(itemExists) {
    return next(new ErrorHandler("Course already in playlist.", 409));
  }

  user.playlist.push({
    course: course._id,
    poster: course.poster.url
  })

  await user.save();

  res
    .status(200)
    .json({
      success: true,
      message: "Added to playlist."
    })
})

export const removeFromPlaylist = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const course = await Course.findById(req.query.id);

  if(!course) {
    return next(new ErrorHandler("Invalid course ID.", 404));
  }

  const newPlaylist = user.playlist.filter((item) => {
    if(item.course.toString() !== course._id.toString()) {
      return item;
    }
  })

  user.playlist = newPlaylist;
  await user.save();

  res
    .status(200)
    .json({
      success: true,
      message: "Removed from playlist."
    })
})

// Admin Controllers ----------------------------------------------------------

export const getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find({});

  res
    .status(200)
    .json({
      success: true,
      users
    })
})

export const changeUserRole = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if(!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  if(user.role === "user") user.role = "admin";
  else user.role = "user";

  await user.save();

  res
    .status(200)
    .json({
      success: true,
      message: "Role updated successfully."
    })
})

export const deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if(!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  await cloudinary.v2.uploader.destroy(user.avatar.public_id);

  // Cancel subscription

  await user.delete();

  res
    .status(200)
    .json({
      success: true,
      message: "User deleted successfully."
    })
})

User.watch().on("change", async () => {
  const stats = await Stats.find({}).sort({ createdAt: "desc" }).limit(1);
  const subbedUsers = await User.find({ "subscription.status": "active" });
  
  stats[0].users = await User.countDocuments();
  stats[0].subscriptions = subbedUsers.length;
  stats[0].createdAt = new Date(Date.now());

  await stats[0].save();
})