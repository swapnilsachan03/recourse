import mongoose from "mongoose";

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter course title"],
    minLength: [10, "Title must be at least 10 characters long"],
    maxLength: [80, "Title must be at max 80 characters long"],
  },
  
  description: {
    type: String,
    required: [true, "Please enter course description"],
    minLength: [40, "Description must be at least 40 characters long"],
    maxLength: [1200, "Description must be at max 1200 characters long"],
  },

  lectures: [
    {
      title: {
        type: String,
        required: true,
      },

      description: {
        type: String,
        required: true,
      },

      video: {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    },
  ],

  poster: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },

  views: {
    type: Number,
    default: 0,
  },
  
  numOfVideos: {
    type: Number,
    default: 0,
  },
  
  category: {
    type: String,
    required: true,
  },
  
  createdBy: {
    type: String,
    required: [true, "Please a course creator name"],
  },
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Course = mongoose.model("Course", schema);