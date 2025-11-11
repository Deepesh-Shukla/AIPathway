// import { useEffect } from "react"
// import { serverUrl } from "../App"
// import axios from "axios"
// import { useDispatch, useSelector } from "react-redux"
// import { setUserData } from "../redux/userSlice"
// const useCurrentUser = ()=>{
//     let dispatch = useDispatch()
   
//     useEffect(()=>{
//         const fetchUser = async () => {
//             try {
//                 let result = await axios.get(serverUrl + "/api/user/currentuser" , {withCredentials:true})
//                 dispatch(setUserData(result.data))

//             } catch (error) {
//                 console.log(error)
//                 dispatch(setUserData(null))
//             }
//         }
//         fetchUser()
//     },[])
// }

// export default useCurrentUser

// import { useEffect, useState } from "react";
// import axios from "../axios";

// const useCurrentUser = () => {
//   const [user, setUser] = useState(null);

//   const fetchUser = async () => {
//     try {
//       const res = await axios.get("/user/currentuser"); // no body needed
//       setUser(res.data);
//     } catch (error) {
//       console.log("Current User Error:", error.response?.data || error);
//     }
//   };

//   useEffect(() => {
//     fetchUser();
//   }, []);

//   return user;
// };

// export default useCurrentUser;

// import { useEffect } from "react";
// import axiosInstance from "../axios";
// import { useDispatch } from "react-redux";
// import { setUserData } from "../redux/userSlice";

// const useCurrentUser = () => {
//   const dispatch = useDispatch();

//   const fetchUser = async () => {
//     try {
//       const result = await axiosInstance.get("/user/currentuser");
//       dispatch(setUserData(result.data));
//     } catch {
//       dispatch(setUserData(null));
//     }
//   };

//   useEffect(() => {
//     fetchUser();
//   }, []);

//   return fetchUser;
// };

// export default useCurrentUser;

// src/customHooks/useCurrentUser.jsx
import { useEffect } from "react";
import axiosInstance from "../axios";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

const useCurrentUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get("/user/currentuser"); // sends cookies
        dispatch(setUserData(res.data));
      } catch (err) {
        // If server returns 400/401, set user null
        console.error("useCurrentUser error:", err?.response?.data || err.message);
        dispatch(setUserData(null));
      }
    };

    fetchUser();
  }, [dispatch]);
};

export default useCurrentUser;
