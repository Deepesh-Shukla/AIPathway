// import React, { useEffect } from 'react'
// import { serverUrl } from '../App'
// import axios from 'axios'
// import { setCreatorCourseData } from '../redux/courseSlice'
// import { useDispatch, useSelector } from 'react-redux'
// import { toast } from 'react-toastify'

// const useCreatorCourseData = () => {
//     const dispatch = useDispatch()
//     const {userData} = useSelector(state=>state.user)
//   return (
//     useEffect(()=>{
//     const getCreatorData = async () => {
//       try {
//         const result = await axios.get(serverUrl + "/api/course/getcreatorcourses" , {withCredentials:true})
        
//          await dispatch(setCreatorCourseData(result.data))

        
//         console.log(result.data)
        
//       } catch (error) {
//         console.log(error)
//         toast.error(error.response.data.message)
//       }
      
//     }
//     getCreatorData()
//   },[userData])
//   )
// }

// export default useCreatorCourseData

// import { useEffect } from "react";
// import axiosInstance from "../axios";
// import { useDispatch, useSelector } from "react-redux";
// import { setCreatorCourseData } from "../redux/courseSlice";

// const useCreatorCourseData = () => {
//   const dispatch = useDispatch();
//   const { userData } = useSelector((state) => state.user);

//   const fetchCreatorCourses = async () => {
//     if (!userData || userData.role !== "educator") return;

//     try {
//       const result = await axiosInstance.get("/course/getcreatorcourses");
//       dispatch(setCreatorCourseData(result.data));
//     } catch (error) {
//       console.log("Creator Courses Error:", error.response?.data);
//     }
//   };

//   useEffect(() => {
//     fetchCreatorCourses();
//   }, [userData]);

//   return fetchCreatorCourses;
// };

// export default useCreatorCourseData;

// src/customHooks/useCreatorCourseData.jsx
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
