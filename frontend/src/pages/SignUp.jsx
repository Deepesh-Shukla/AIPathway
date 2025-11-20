import React from "react";
import logo from '../assets/logo.jpg'
import google from "../assets/google.jpg";
import { IoEyeOutline } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import axios from "axios";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../utils/Firebase";

function SignUp() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  //   const serverUrl = import.meta.env.VITE_SERVER_URL;
  //   console.log("Server URL is:", import.meta.env.VITE_SERVER_URL);

  const handleSignUp = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        serverUrl + "/api/auth/signup",
        { name, password, email, role },
        { withCredentials: true }
        // `${serverUrl}/api/auth/signup`,
        // { name, email, password, role },
        // { withCredentials: true }
      );
      dispatch(setUserData(result.data));
      setLoading(false);
      navigate("/");
      toast.success("Signup Successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  const googleSignUp = async () => {
    console.log("Google Sign Up clicked!");
    try {
      const response = await signInWithPopup(auth, provider);
      let user = response.user;
      let name = user.displayName;
      let email = user.email;
      const result = await axios.post(
        serverUrl + "/api/auth/googleauth",
        { name, email, role },
        { withCredentials: true }
      );
      dispatch(setUserData(result.data));
      navigate("/");
      toast.success("Signup Successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="bg-[#dddbdb] w-[100vw] h-[100vh] flex items-center justify-center">
      <form
        className="w-[90%] md:w-150 h-113 bg-[white] shadow-xl rounded-2xl flex"
        onSubmit={(event) => event.preventDefault()}
      >
        {/* left div */}

        <div className="md:w-[50%] w-[100%] h-[100%] flex flex-col items-center justify-center gap-1 py-2">
          <div>
            <h1 className="font-semibold text-[black] text-2xl">
              Let's get started
            </h1>
            <h2 className="text-[#999797] text-[18px] px-5">
              Create your Account
            </h2>
          </div>

          <div className="flex flex-col gap-1 w-[80%] items-start justify-center px-3">
            <label htmlFor="name" className="font-semibold">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="border-1 w-[100%] h-[32px] border-[#e7e6e6] text-[15px] px-[20px]"
              placeholder="Your Name"
              onChange={(event) => setName(event.target.value)}
              value={name}
            />
          </div>

          <div className="flex flex-col gap-1 w-[80%]     items-start justify-center px-3">
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="border-1 w-[100%] h-[32px] border-[#e7e6e6] text-[15px] px-[20px]"
              placeholder="Your Email"
              onChange={(event) => setEmail(event.target.value)}
              value={email}
            />
          </div>

          <div className="flex flex-col gap-1 w-[80%] items-start justify-center px-3 relative">
            <label htmlFor="password" className="font-semibold">
              {" "}
              Password{" "}
            </label>
            <input
              type={show ? "text" : "password"}
              id="password"
              className="border w-[100%] h-[32px] border-[#e7e6e6] text-[15px] px-[20px]"
              placeholder="Your Password"
              onChange={(event) => setPassword(event.target.value)}
              value={password}
            />
            {!show ? (
              <IoEyeOutline
                className="absolute w-[20px] h-[20px] cursor-pointer right-[9%] bottom-[10%]"
                onClick={() => setShow((prev) => !prev)}
              />
            ) : (
              <IoEye
                className="absolute w-[20px] h-[20px] cursor-pointer right-[9%] bottom-[10%]"
                onClick={() => setShow((prev) => !prev)}
              />
            )}
          </div>

          <div className="flex md:w-[50%] w-[70%] items-center
             justify-center gap-x-6">
            <span className={`px-[10px] py-[5px] border-[2px]
                  border-[#e7e6e6] rounded-xl cursor-pointer hover:border-black ${ role === "student" ? "border-black" : "border-[#646464]"}`}
                onClick={() => setRole("student")}>
                Student{" "}</span>
            <span className={`px-[10px] py-[5px] border-[2px]
                  border-[#e7e6e6] rounded-xl cursor-pointer hover:border-black ${role === "educator" ? "border-black" : "border-[#646464]"}`}
                onClick={() => setRole("educator")}>
                Educator{" "}</span>
          </div>

          <button className="w-[80%] h-[40px] bg-black
               text-white cursor-pointer flex items-center justify-center rounded-[5px]" 
               onClick={handleSignUp} disabled={loading}
          > {loading ? <ClipLoader size={30} color="white"/>
           : "SignUp"}
          </button>

          <div className="w-[80%] flex items-center gap-2">
            <div className="w-[25%] h-[0.5px] bg-[#c4c4c4]"></div>
            <div className="w-[50%] text-[15px] text- [#6f6f6f] flex items-center justify-center">
              Or continue
            </div>
            <div className="w-[25%] h-[0.5px] bg-[#c4c4c4]"></div>
          </div>

          {/* <div
              className="w-[80%] h-[40px] border border-[black] rounded-[5px] flex items-center justify-center cursor-pointer relative z-10"
              onClick={googleSignUp}>
              <img src={google} className="w-[25px]" alt="google icon" />
              <span className="text-[18px] text-gray-500">oogle</span>
            </div> */}

          <button
            type="button"
            onClick={googleSignUp}
            className="w-[80%] h-[40px] border border-black rounded-[5px] flex items-center justify-center cursor-pointer relative z-10"
          >
            <img src={google} className="w-[25px]" alt="google  icon" />
            <span className="text-[18px] text-gray-600">oogle</span>
          </button>

          <div className="text-[#6f6f6f]">
            Already have an account?
            <span
              className="underline underline-offset-1 text-[black] cursor-pointer ml-1"
              onClick={() => navigate("/login")}
            >
              {" "}
              Login{" "}
            </span>
          </div>
        </div>

        {/* right div */}
        <div
          className="w-[50%] h-[100%] rounded-r-2xl
             bg-[black] md:flex items-center justify-center flex-col hidden"
        >
          <img src={logo} alt="logo" className="w-30 shadow-2xl" />
          <span className="text-2xl text-white">AIPathway</span>
        </div>
      </form>
    </div>
  );
}
export default SignUp;
