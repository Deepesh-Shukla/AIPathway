import { useEffect } from "react";
import axiosInstance from "../axios";
import { useDispatch } from "react-redux";
import { setCourseData } from "../redux/courseSlice";

const useCourseData = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllPublishedCourse = async () => {
      try {
        const res = await axiosInstance.get("/course/getpublishedcoures"); // baseURL + path
        dispatch(setCourseData(res.data));
      } catch (error) {
        console.error("useCourseData error:", error?.response?.data || error.message);
      }
    };
    getAllPublishedCourse();
  }, [dispatch]);
};

export default useCourseData;

