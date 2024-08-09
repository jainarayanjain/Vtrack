// useAuth.js
import { useNavigate } from "react-router-dom";
import { Browser, LOCAL_STORAGE_KEY } from "../constants";
import { useAppDispatch, useAppSelector } from "."; // Make sure to import the correct selector hook
import { setLoggedIn } from "../features/authSlice";
import { resetState } from "../features/resetSlice";

export default function useAuth() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const logout = () => {
    dispatch(resetState());
    localStorage.removeItem("persist:root");
    dispatch(setLoggedIn(false));
    dispatch(resetState());


    navigate(Browser.HOME);
  };

  // If you want to refresh the page after logout to reflect the state change, you can use window.location.reload()
  const logoutAndRefresh = () => {
    logout();
    window.location.reload();
  };

  return { logout: logoutAndRefresh };
}
