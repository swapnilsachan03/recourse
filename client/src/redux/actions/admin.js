import { server } from '../store';
import axios from 'axios';

// Create courses actions
export const createCourse = formdata => async dispatch => {
  try {
    dispatch({ type: 'createCourseRequest' });

    const { data } = await axios.post(`${server}/createcourse`, formdata, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });

    dispatch({ type: 'createCourseSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'createCourseFail',
      payload: error.response.data.message,
    });
  }
};

// Delete courses actions
export const deleteCourse = id => async dispatch => {
  try {
    dispatch({ type: 'deleteCourseRequest' });

    const { data } = await axios.delete(`${server}/course/${id}`, {
      withCredentials: true,
    });

    dispatch({ type: 'deleteCourseSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'deleteCourseFail',
      payload: error.response.data.message,
    });
  }
};

// Add Lecture actions
export const addLecture = (id, formdata) => async dispatch => {
  try {
    dispatch({ type: 'addLectureRequest' });

    const { data } = await axios.post(`${server}/course/${id}`, formdata, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });
    dispatch({ type: 'addLectureSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'addLectureFail',
      payload: error.response.data.message,
    });
  }
};

// Delete Lecture actions
export const deleteLecture = (courseId, lectureId) => async dispatch => {
  try {
    dispatch({ type: 'deleteLectureRequest' });

    const { data } = await axios.delete(
      `${server}/lecture?courseID=${courseId}&lectureID=${lectureId}`,
      {
        withCredentials: true,
      }
    );
    dispatch({ type: 'deleteLectureSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'deleteLectureFail',
      payload: error.response.data.message,
    });
  }
};

// Get All Users actions
export const getAllUsers = () => async dispatch => {
  try {
    dispatch({ type: 'getAllUsersRequest' });

    const { data } = await axios.get(`${server}/admin/getAllUsers`, {
      withCredentials: true,
    });
    dispatch({ type: 'getAllUsersSuccess', payload: data.users });
  } catch (error) {
    dispatch({
      type: 'getAllUsersFail',
      payload: error.response.data.message,
    });
  }
};

// Update User Role actions
export const updateUserRole = id => async dispatch => {
  try {
    dispatch({ type: 'updateUserRoleRequest' });

    const { data } = await axios.put(
      `${server}/admin/user/${id}`,
      {},
      {
        withCredentials: true,
      }
    );
    dispatch({ type: 'updateUserRoleSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'updateUserRoleFail',
      payload: error.response.data.message,
    });
  }
};

// Delete User actions
export const deleteUser = id => async dispatch => {
  try {
    dispatch({ type: 'deleteUserRequest' });

    const { data } = await axios.delete(`${server}/admin/user/${id}`, {
      withCredentials: true,
    });
    dispatch({ type: 'deleteUserSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'deleteUserFail',
      payload: error.response.data.message,
    });
  }
};

// Get Dashboard Stats actions
export const getDashboardStats = () => async dispatch => {
  try {
    dispatch({ type: 'getDashboardStatsRequest' });

    const { data } = await axios.get(`${server}/admin/stats`, {
      withCredentials: true,
    });
    dispatch({ type: 'getDashboardStatsSuccess', payload: data });
  } catch (error) {
    dispatch({
      type: 'getDashboardStatsFail',
      payload: error.response.data.message,
    });
  }
};