import axios from "axios";
import { server } from "../store";

export const getAllCourses = (category="", keywords="") => async (dispatch) => {
  try {
    dispatch({ type: "allCoursesRequest" });
    
    const { data } = await axios.get(
      `${server}/courses/?keywords=${keywords}&category=${category}`
    );

    dispatch({ type: "allCoursesSuccess", payload: data.courses });
  }
  
  catch (error) {
    dispatch({ type: "allCoursesFail", payload: error.response.data.message });
  }
}