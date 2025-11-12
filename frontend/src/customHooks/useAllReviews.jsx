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


