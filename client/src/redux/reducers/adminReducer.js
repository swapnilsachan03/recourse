import { createReducer } from '@reduxjs/toolkit';

export const adminReducer = createReducer(
  {},
  {
    // Get Dashboard Stats

    getDashboardStatsRequest: state => {
      state.loading = true;
    },

    getDashboardStatsSuccess: (state, action) => {
      state.loading = false;
      state.stats = action.payload.stats;
      state.viewsCount = action.payload.viewsCount;
      state.subscriptionCount = action.payload.subscriptionCount;
      state.usersCount = action.payload.usersCount;
      state.subscriptionPercentage = action.payload.subscriptionPercentage;
      state.viewsPercentage = action.payload.viewsPercentage;
      state.usersPercentage = action.payload.usersPercentage;
      state.usersProfit = action.payload.usersProfit;
      state.viewsProfit = action.payload.viewsProfit;
      state.subscriptionProfit = action.payload.subscriptionProfit;
    },

    getDashboardStatsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Get All Users

    getAllUsersRequest: state => {
      state.loading = true;
    },

    getAllUsersSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },

    getAllUsersFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Delete User
    deleteUserRequest: state => {
      state.loading = true;
    },

    deleteUserSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },

    deleteUserFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Update User Role
    updateUserRoleRequest: state => {
      state.loading = true;
    },

    updateUserRoleSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },

    updateUserRoleFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Create Course
    createCourseRequest: state => {
      state.loading = true;
    },

    createCourseSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },

    createCourseFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Delete Course
    deleteCourseRequest: state => {
      state.loading = true;
    },

    deleteCourseSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },

    deleteCourseFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Add Lecture
    addLectureRequest: state => {
      state.loading = true;
    },

    addLectureSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },

    addLectureFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Delete Lecture
    deleteLectureRequest: state => {
      state.loading = true;
    },

    deleteLectureSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },

    deleteLectureFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Clear reducer
    clearError: state => {
      state.error = null;
    },
    
    clearMessage: state => {
      state.message = null;
    },
  }
);