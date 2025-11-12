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
