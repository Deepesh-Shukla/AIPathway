// import axios from 'axios';
// import { serverUrl } from '../App.jsx';
// import { useDispatch, useSelector } from 'react-redux';
// import { setCourseData } from '../redux/courseSlice.js';
// import { useEffect } from 'react';
// import React from 'react'

// const useCourseData = () => {
//   const dispatch = useDispatch()
//   const {userData} = useSelector((state)=>state.user)

//   useEffect(()=>{
//     const getAllPublishedCourse = async () => {
//       try {
//         const result = await axios.get(serverUrl + "/api/course/getpublishedcoures" , {withCredentials:true})
//         console.log(result.data)
//         dispatch(setCourseData(result.data))
        
//       } catch (error) {
//         console.log(error)
//       }
//     }
//     getAllPublishedCourse()
//   },[])

// }

// export default useCourseData

// import { useEffect, useState } from "react";
// import axios from "../axios";

// const useCreatorCourseData = () => {
//   const [courses, setCourses] = useState([]);

//   const getCreatorData = async () => {
//     try {
//       const res = await axios.get("/course/getcreatorcourses");
//       setCourses(res.data);
//     } catch (error) {
//       console.log("Creator Courses Error:", error.response?.data || error);
//     }
//   };

//   useEffect(() => {
//     getCreatorData();
//   }, []);

//   return courses;
// };

// export default useCreatorCourseData;



// import { useEffect } from "react";
// import axiosInstance from "../axios";
// import { useDispatch } from "react-redux";
// import { setCourseData } from "../redux/courseSlice";

// const useCourseData = () => {
//   const dispatch = useDispatch();

//   const fetchCourses = async () => {
//     try {
//       const result = await axiosInstance.get("/course/getpublishedcoures");
//       dispatch(setCourseData(result.data));
//     } catch (error) {
//       console.log("Published Courses Error:", error.response?.data);
//     }
//   };

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   return fetchCourses;
// };

// export default useCourseData;

// src/customHooks/useCourseData.jsx
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

