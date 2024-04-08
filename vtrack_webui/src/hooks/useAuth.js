// useAuth.js
import { useNavigate } from "react-router-dom";
import { Browser, LOCAL_STORAGE_KEY } from "../constants";
import { useAppDispatch, useAppSelector } from "."; // Make sure to import the correct selector hook
import { setLoggedIn } from "../features/authSlice";
import { resetState } from "../features/resetSlice";

export default function useAuth() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn); // Replace with your actual selector

  const logout = () => {
    console.log("this is being called--->");
    dispatch(resetState());
    // localStorage.clear();
    localStorage.removeItem("persist:root");
    // localStorage.removeItem(LOCAL_STORAGE_KEY);
    dispatch(setLoggedIn(false));
    dispatch(resetState());

    // Optionally, you can clear other parts of the state as needed
    // dispatch(clearOtherState());

    navigate(Browser.HOME);
  };

  // If you want to refresh the page after logout to reflect the state change, you can use window.location.reload()
  const logoutAndRefresh = () => {
    logout();
    window.location.reload();
  };

  return { logout: logoutAndRefresh };
}
