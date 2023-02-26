import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import { sendEmail } from "../utils/sendEmail.js";
import { Stats } from "../models/Stats.js";

export const contact = catchAsyncError(async (req, res, next) => {
  const { name, email, message } = req.body;

  if(!name || !email || !message) {
    return next(new ErrorHandler("All fields are mandatory", 400));
  }

  const to = process.env.MY_MAIL;
  const subject = "Contact from reCourse";
  const text = `I am ${name} and my e-mail is ${email}.\n\n ${message}`;

  await sendEmail(to, subject, text);

  res
    .status(200)
    .json({
      success: true,
      message: "Your message has been sent"
    })
})

export const courseRequest = catchAsyncError(async (req, res, next) => {
  const { name, email, course } = req.body;

  if(!name || !email || !course) {
    return next(new ErrorHandler("All fields are mandatory", 400));
  }

  const to = process.env.MY_MAIL;
  const subject = "Request for a course on reCourse";
  const text = `I am ${name} and my e-mail is ${email}.\n\n ${course}`;

  await sendEmail(to, subject, text);

  res
    .status(200)
    .json({
      success: true,
      message: "Your request has been sent"
    })
})

export const getDashboardStats = catchAsyncError(async (req, res, next) => {
  const stats = await Stats.find({}).sort({ createdAt: "desc" }).limit(12);

  const statsData = [];
  
  for (let i = 0; i < stats.length; i++) {
    statsData.unshift(stats[i]);
  }
  const requiredSize = 12 - stats.length;
  
  for (let i = 0; i < requiredSize; i++) {
    statsData.unshift({
      users: 0,
      subscriptions: 0,
      views: 0
    })
  }

  const usersCount = statsData[11].users;
  const subsCount = statsData[11].subscriptions;
  const viewsCount = statsData[11].views;

  let usersProfit = true, subsProfit = true, viewsProfit = true;
  let usersChange = true, subsChange = true, viewsChange = true;

  if(statsData[10].users === 0) usersChange = usersCount * 100;
  if(statsData[10].subscriptions === 0) subsChange = subsCount * 100;
  if(statsData[10].views === 0) viewsChange = viewsCount * 100;

  else {
    const difference = {
      users: statsData[11].users - statsData[10].users,
      subscriptions: statsData[11].subscriptions - statsData[10].subscriptions,
      views: statsData[11].views - statsData[10].views
    };

    usersChange = (difference.users / statsData[10].users) * 100;
    subsChange = (difference.subscriptions / statsData[10].subscriptions) * 100;
    viewsChange = (difference.views / statsData[10].views) * 100;

    if(usersChange < 0) usersProfit = false;
    if(subsChange < 0) subsChange = false;
    if(viewsChange < 0) viewsProfit = false;
  }

  res
    .status(200)
    .json({
      success: true,
      stats: statsData,
      usersCount,
      subsCount,
      viewsCount,
      usersChange,
      subsChange,
      viewsChange,
      usersProfit,
      subsProfit,
      viewsProfit
    })
})