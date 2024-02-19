// src/components/CheckInPage.js
import React, { useState, useEffect } from "react";
import "../../assets/main.css";
import { API, LOCAL_STORAGE_KEY } from "../../constants";
import Axios from "../../services/axios";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../hooks/index";
import { selectIsLoggedIn, setLoggedIn } from "../../features/authSlice";
import { setVisitorType } from "../../features/VisitorSlice";
import { useSelector } from "react-redux";
import { NextButton, StepProgressBar } from "../../components";
import { MdOutlineCheckCircleOutline } from "react-icons/md";

const CheckIn = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [emailError, setEmailError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [countdown, setCountdown] = useState(20); // Initial countdown time in seconds

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.auth);
  const visitorTypeData = useSelector((state) => state.visitor);
  console.log(visitorTypeData, "this is visitoryTyper--->");

  const handleEmailChange = (e) => {
    const input = e.target.value.trim(); // Trim whitespace
    setEmail(input);

    // Simple email validation (replace with a more robust solution if needed)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(input)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const handleOtpChange = (e) => {
    // const input = e.target.value.replace(/\D/g, ""); // Allow only digits
    setOtp(e.target.value);

    // if (!input) {
    //   setOtpError("OTP is required.");
    // } else {
    //   setOtpError("");
    // }
  };
  const Email_Payload = {
    email,
  };
  const OTP_Payload = {
    otp,
    visitor: visitorTypeData.visitorData.visitorId,
  };

  const handleSendOtp = async () => {
    // Simulating OTP sending with a timeout (replace with actual API call)
    try {
      console.log('this is being clicked===>')
      const response = await Axios.post(API.V1.VISITOR_DETAILS, Email_Payload);
      const data = response.data;
      if (response.status === 401) {
        console.log(response.data, "Invalid credentials");
      }
      const AccessToken = response.data.token;
      console.log(AccessToken, "this is access token--->");
      if (response.status === 201) {
        console.log(response.data);
        const payload = {
          visitorId: data.id,
        };
        setTimeout(() => {
          setIsButtonDisabled(true); // Disable the button after sending OTP
          setIsOtpSent(true);
          setCountdown(20); // Reset the countdown
        }, 1000);
        dispatch(setVisitorType(payload));
        console.log("this is send OTP  in");
      }
    } catch (error) {
      console.log(error, "something went wrong while logging in");
    }
  };

  const handleCheckIn = async () => {
    // if (emailError || otpError) {
    //   console.log("Validation failed. Please fix errors.");
    //   return;
    // }
    try {
      const response = await Axios.post(API.V1.VISITOR_VALIDS, OTP_Payload);
      if (response.status === 401) {
        console.log(response.data, "Invalid credentials");
      }
      const AccessToken = response.data.token;
      console.log(AccessToken, "this is access token--->");
      if (response.status === 201) {
        // dispatch(setLoggedIn(true));
        console.log("this is Valid OTP");
        navigate("/checkin/photo-interaction");
      }
      // setUser(await response.data);
      // await dispatch(fetchUser());
      // navigate("/");
      // setIsLoggedIn(true);
    } catch (error) {
      console.log(error, "something went wrong while logging in");
    }
    console.log("Checking in:", { email, otp });
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
      {/* <StepProgressBar
        currentStep={1} // Set currentStep to 1 to show the first step
        completedStep={0} // Set completedStep to 0 initially
        disableNavigation={true}
      /> */}
      <div className="flex flex-col md:flex-row form-shadow rounded-2xl p-6 items-center justify-center max-w-screen-md gap-x-5 mx-auto">
        <img src="./images/vtrack-login.jpg" className="w-full md:w-1/2 lg:w-7/12 xl:w-3/6" alt="login_image" />

        <form className="w-full max-w-sm md:w-full lg:w-xl">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <h1 className="mb-8 md:mb-0 text-xl font-bold">CheckIn</h1>
            <img src="images/innova.png" alt="Company Logo" className="h-7 w-auto md:ml-auto" />
          </div>
          <div className="mb-1">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold ">
              Email Address*
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

          <div className="mb-2">
            <button
              className={`${
                isButtonDisabled
                  ? "text-gray-700 cursor-not-allowed text-sm"
                  : "text-blue-700 hover:underline focus:outline-none text-sm"
              }`}
              type="button"
              onClick={handleSendOtp}
              disabled={isButtonDisabled}
            >
              {isButtonDisabled ? `Resend OTP in ${countdown}s` : "Send OTP"}
            </button>
          </div>

          <div className="mb-6">
            <label htmlFor="otp" className="block text-gray-700 text-sm font-bold">
              OTP*
            </label>
            <input
              type="text"
              id="otp"
              name="otp"
              value={otp}
              onChange={handleOtpChange}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                otpError ? "border-red-500" : ""
              }`}
              placeholder="Enter OTP"
            />
            {otpError && <p className="text-red-500 text-xs italic mt-1">{otpError}</p>}
          </div>
          <div className="flex flex-col md:flex-row items-center md:justify-between w-full">
            <NextButton name={"Check-in"} handleButton={handleCheckIn} icons={<MdOutlineCheckCircleOutline />} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckIn;
