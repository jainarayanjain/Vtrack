import { useNavigate } from "react-router-dom";
import { Browser, LOCAL_STORAGE_KEY } from "../constants";
import { useAppDispatch } from ".";
import {setLoggedIn} from "../features/authSlice";


export default function useAuth() {
    const navigate=useNavigate();
    const dispatch=useAppDispatch();
  const logout = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    dispatch(setLoggedIn(false));
    navigate(Browser.LOGIN);

  };
  return {logout}
}
