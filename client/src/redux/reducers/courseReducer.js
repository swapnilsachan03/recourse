import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  courses: [],
  loading: false,
};

export const courseReducer = createReducer(initialState, {
  allCoursesRequest: (state, action) => {
    state.loading = true;
  },

  allCoursesSuccess: (state, action) => {
    state.loading = false;
    state.courses = action.payload;
  },

  allCoursesFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  
  addToPlaylistRequest: (state, action) => {
    state.loading = true;
  },

  addToPlaylistSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },

  addToPlaylistFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  
  clearError: (state) => {
    state.error = null;
  },

  clearMessage: (state) => {
    state.message = null;
  },
});