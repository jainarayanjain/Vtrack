// src/components/CheckInPage.js
import React, { useState, useEffect } from "react";
import "../../assets/main.css";
import { API, Browser, LOCAL_STORAGE_KEY } from "../../constants";
import Axios from "../../services/axios";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../hooks/index";
import { setLoggedIn } from "../../features/authSlice";
import { NextButton } from "../../components";
import { MdLogin } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [countdown, setCountdown] = useState(20); // Initial countdown time in seconds

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const setLogin = useAppSelector((state) => state.auth);

  const handleUserNameChange = (e) => {
    const input = e.target.value.trim(); // Trim whitespace
    setUsername(input);
  };

  const handlePasswordChange = (e) => {
    // const input = e.target.value.replace(/\D/g, ""); // Allow only digits
    setPassword(e.target.value);
  };
  const loginPayload = {
    username: username,
    password: password,
  };

  const clearWaitingQueue = () => {
    // Easy, right 😎
    toast.clearWaitingQueue();
  };
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await Axios.post(API.V1.ACCOUNT_LOGIN, loginPayload);
      if (response.status === 400) {
        console.log(response.data, "Invalid credentials");
        toast.error("Invalid Credentials", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
      const AccessToken = response.data.token;
      console.log(AccessToken, "this is access token--->");
      if (response.status === 201) {
        dispatch(setLoggedIn({ isLoggedIn: true }));
        console.log("this is successfully logged in");
        localStorage.setItem(LOCAL_STORAGE_KEY, AccessToken);
        navigate(Browser.HOME);
      }
    } catch (error) {
      console.log(error, "something went wrong while logging in");
      toast.error("Something went wrong while logging in", {
        position: "top-right",
      });
    } finally {
      clearWaitingQueue();
    }
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

        <form className="w-full max-w-sm md:w-full lg:w-xl" onSubmit={handleLogin}>
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 ">
            <h1 className="mb-8 md:mb-0 text-2xl font-bold">Login</h1>
            <img src="images/innova.png" alt="Company Logo" className="h-7 w-auto md:ml-auto" />
          </div>
          <div className="mb-2">
            <label htmlFor="username" className="block text-gray-700 text-base">
              Username*
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleUserNameChange}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline `}
              placeholder="Enter your user name"
            />
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
              autoComplete="true"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                passwordError ? "border-red-500" : ""
              }`}
              placeholder="Enter password"
            />
            {passwordError && <p className="text-red-500 text-xs italic mt-1">{passwordError}</p>}
          </div>
          <div className="flex flex-col md:flex-row items-center md:justify-between w-full">
            <NextButton type={"submit"} name={"Login"} handleButton={handleLogin} icons={<MdLogin />} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
