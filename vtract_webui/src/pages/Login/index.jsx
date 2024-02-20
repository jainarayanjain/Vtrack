// src/components/CheckInPage.js
import React, { useState, useEffect } from "react";
import "../../assets/main.css";
import { API, Browser, LOCAL_STORAGE_KEY } from "../../constants";
import Axios from "../../services/axios";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../hooks/index";
import {  setLoggedIn } from "../../features/authSlice";
import { NextButton } from "../../components";
import { MdLogin } from "react-icons/md";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [countdown, setCountdown] = useState(20); // Initial countdown time in seconds

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const setLogin = useAppSelector((state) => state.auth);

  //   useEffect(() => {
  //     if (selector || localStorage.getItem(LOCAL_STORAGE_KEY) != undefined) {
  //       navigate("/checkin");
  //     }
  //   }, []);

  const handleEmailChange = (e) => {
    const input = e.target.value.trim(); // Trim whitespace
    setEmail(input);

    // Simple email validation (replace with a more robust solution if needed)
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!emailRegex.test(input)) {
    //   setEmailError('Please enter a valid email address.');
    // } else {
    //   setEmailError('');
    // }
  };

  const handlePasswordChange = (e) => {
    // const input = e.target.value.replace(/\D/g, ""); // Allow only digits
    setPassword(e.target.value);

    // if (!input) {
    //   setOtpError("OTP is required.");
    // } else {
    //   setOtpError("");
    // }
  };
  const loginPayload = {
    username: email,
    password: password,
  };

  const handleLogin = async () => {
    console.log(setLogin, "this is login-->");

    if (emailError || passwordError) {
      console.log("Validation failed. Please fix errors.");
      return;
    }
    try {
      const response = await Axios.post(API.V1.ACCOUNT_LOGIN, loginPayload);
      if (response.status === 401) {
        console.log(response.data, "Invalid credentials");
      }
      const AccessToken = response.data.token;
      console.log(AccessToken, "this is access token--->");
      if (response.status === 201) {
        dispatch(setLoggedIn({isLoggedIn:true}));
        console.log("this is successfully logged in");
        localStorage.setItem(LOCAL_STORAGE_KEY, AccessToken);
        // setLoggedIn(true);
        console.log(setLogin, "this is login-->");

        navigate(Browser.HOME);
      }
      // setUser(await response.data);
      // await dispatch(fetchUser());
      // navigate("/");
    } catch (error) {
      console.log(error, "something went wrong while logging in");
    }
    console.log("Checking in:", { email, password });
  };

  useEffect(() => {
    let timer;

    if (isButtonDisabled) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown === 1) {
            clearInterval(timer);
            setIsButtonDisabled(false); // Enable the button after the countdown
          }
          return prevCountdown - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer); // Cleanup timer on component unmount
  }, [isButtonDisabled]);

  return (
    <div className="flex flex-col items-center justify-center h-screen p-8">
      <div className="flex flex-col md:flex-row form-shadow rounded-2xl p-6 items-center justify-center max-w-screen-md gap-x-5 mx-auto">
        <img src="./images/tablet_login.svg" className="w-full md:w-1/2 lg:w-7/12 xl:w-3/6" alt="login_image" />

        <form className="w-full max-w-sm md:w-full lg:w-xl">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 ">
            <h1 className="mb-8 md:mb-0 text-2xl font-bold">Login</h1>
            <img src="images/innova.png" alt="Company Logo" className="h-7 w-auto md:ml-auto" />
          </div>
          <div className="mb-2">
            <label htmlFor="email" className="block text-gray-700 text-base">
              Username*
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                emailError ? "border-red-500" : ""
              }`}
              placeholder="Enter your email address"
            />
            {emailError && <p className="text-red-500 text-xs italic mt-1">{emailError}</p>}
          </div>

          <div className="mb-6">
            <label htmlFor="otp" className="block text-gray-700 text-base">
              Password*
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                passwordError ? "border-red-500" : ""
              }`}
              placeholder="Enter OTP"
            />
            {passwordError && <p className="text-red-500 text-xs italic mt-1">{passwordError}</p>}
          </div>
          <div className="flex flex-col md:flex-row items-center md:justify-between w-full">
            {/* <button
              className=" flex bg-green-500 hover:bg-green-700 text-sm w-full  text-white font-bold py-3 px-5 rounded focus:outline-none focus:shadow-outline items-center justify-center md:ml-auto"
              type="button"
              onClick={handleLogin}
            >
              Login
            </button> */}
            <NextButton name={"Login"} handleButton={handleLogin} icons={<MdLogin />} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
