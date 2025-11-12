import { useEffect } from "react";
import axiosInstance from "../axios";
import { useDispatch, useSelector } from "react-redux";
import { setCreatorCourseData } from "../redux/courseSlice";

const useCreatorCourseData = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    // only try to fetch if user exists (logged in)
    if (!userData) {
      // clear creator courses if desired:
      dispatch(setCreatorCourseData([]));
      return;
    }

    const getCreatorData = async () => {
      try {
        const res = await axiosInstance.get("/course/getcreatorcourses");
        dispatch(setCreatorCourseData(res.data));
      } catch (error) {
        // server may return 400 if token missing/invalid
        console.error("useCreatorCourseData error:", error?.response?.data || error.message);
        dispatch(setCreatorCourseData([]));
      }
    };

    getCreatorData();
  }, [dispatch, userData]);
};

export default useCreatorCourseData;
