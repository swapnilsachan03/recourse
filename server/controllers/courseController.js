import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { Course } from "../models/Course.js";
import getDataURI from "../utils/dataURI.js";
import ErrorHandler from "../utils/errorHandler.js";
import cloudinary from "cloudinary";
import { Stats } from "../models/Stats.js";

export const getAllCourses = catchAsyncError(async (req, res, next) => {
  const keywords = req.query.keywords || "";
  const category = req.query.category || "";
  
  const courses = await Course.find({
    title: {
      $regex: keywords,
      $options: "i",
    },
    category: {
      $regex: category,
      $options: "i",
    }
  }).select("-lectures");

  res.status(200).json({
    success: true,
    courses
  })
})

export const createCourse = catchAsyncError(async (req, res, next) => {
  const { title, description, category, createdBy } = req.body;
  const file = req.file;
  
  const fileURI = getDataURI(file);
  const myCloud = await cloudinary.v2.uploader.upload(fileURI.content);

  if(!title || !description || !category || !createdBy) {
    return next(new ErrorHandler(
      "Please add all fields,", 400
    ));
  }
  
  await Course.create({
    title,
    description,
    category,
    createdBy,
    poster: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url
    }
  });

  res.status(201).json({
    success: true,
    message: "Course created successfully! You can add lectures now."
  })
})

export const getCourseLectures = catchAsyncError(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if(!course) {
    return next(new ErrorHandler("Course not found or invalid course ID", 404));
  }

  course.views += 1;
  await course.save();

  res.status(200).json({
    success: true,
    lectures: course.lectures
  })
})

// Max video size = 100 MB
export const addLecture = catchAsyncError(async (req, res, next) => {
  const { title, description } = req.body;
  const course = await Course.findById(req.params.id);
  const file = req.file;

  if(!course) {
    return next(new ErrorHandler("Course not found or invalid course ID", 404));
  }

  const fileURI = getDataURI(file);
  const myCloud = await cloudinary.v2.uploader.upload(fileURI.content, {
    resource_type: "video"
  });

  course.lectures.push({
    title,
    description,
    video: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url
    }
  })

  course.numOfVideos = course.lectures.length;
  await course.save();

  res.status(200).json({
    success: true,
    message: "Lecture added in course successfully"
  })
})

export const deleteCourse = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const course = await Course.findById(id);
  
  if(!course) {
    return next(new ErrorHandler("Course not found or invalid course ID", 404));
  }

  await cloudinary.v2.uploader.destroy(course.poster.public_id);

  for (let i = 0; i < course.lectures.length; i++) {
    const singleLecture = course.lectures[i];
    await cloudinary.v2.uploader.destroy(singleLecture.video.public_id, {
      resource_type: "video"
    });
  }

  await course.remove();

  res.status(200).json({
    success: true,
    message: "Course deleted successfully."
  })
})

export const deleteLecture = catchAsyncError(async (req, res, next) => {
  const { courseID, lectureID } = req.query;
  const course = await Course.findById(courseID);
  
  if(!course) {
    return next(new ErrorHandler("Course not found or invalid course ID", 404));
  }

  const lecture = course.lectures.find((item) => {
    if(item._id.toString() === lectureID) return item;
  })

  await cloudinary.v2.uploader.destroy(lecture.video.public_id, {
    resource_type: "video"
  });
  
  course.lectures = course.lectures.filter((item) => {
    if(item._id.toString() !== lectureID) return item;
  })

  course.numOfVideos = course.lectures.length;
  await course.save();

  res.status(200).json({
    success: true,
    message: "Lecture deleted successfully."
  })
})

Course.watch().on("change", async () => {
  const stats = await Stats.find({}).sort({ createdAt: "desc" }).limit(1);
  
  const courses = await Course.find({});
  var totalViews = 0;

  for (let i = 0; i < courses.length; i++) {
    totalViews += courses[i].views;
  }

  stats[0].views = totalViews;
  stats[0].createdAt = new Date(Date.now());

  await stats[0].save();
})