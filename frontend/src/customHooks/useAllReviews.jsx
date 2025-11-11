// import React, { useEffect } from 'react'
// import { useDispatch } from 'react-redux'
// import { serverUrl } from '../App'
// import { setAllReview } from '../redux/reviewSlice'
// import axios from 'axios'

// const useAllReviews = () => {

//    const dispatch = useDispatch()
  

//   useEffect(()=>{
//     const getAllReviews = async () => {
//       try {
//         const result = await axios.get(serverUrl + "/api/review/allReview" , {withCredentials:true})
//         console.log(result.data)
//         dispatch(setAllReview(result.data))
        
//       } catch (error) {
//         console.log(error)
//       }
//     }
//     getAllReviews()
//   },[])
  
// }

// export default useAllReviews


// import { useEffect } from "react";
// import axiosInstance from "../axios";
// import { useDispatch } from "react-redux";
// import { setAllReview } from "../redux/reviewSlice";

// const useAllReviews = () => {
//   const dispatch = useDispatch();

//   const fetchAllReviews = async () => {
//     try {
//       const result = await axiosInstance.get("/review/allReview");
//       dispatch(setAllReview(result.data));
//     } catch (error) {
//       console.log("Review Load Error:", error);
//     }
//   };

//   useEffect(() => {
//     fetchAllReviews();
//   }, []);

//   return fetchAllReviews;
// };

// export default useAllReviews;

// src/customHooks/useAllReviews.jsx
import { useEffect } from "react";
import axiosInstance from "../axios";
import { useDispatch } from "react-redux";
import { setAllReview } from "../redux/reviewSlice";

const useAllReviews = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axiosInstance.get("/review/allReview");
        dispatch(setAllReview(res.data));
      } catch (error) {
        console.error("useAllReviews error:", error?.response?.data || error.message);
        dispatch(setAllReview([]));
      }
    };

    fetchReviews();
  }, [dispatch]);
};

export default useAllReviews;


