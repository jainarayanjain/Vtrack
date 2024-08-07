import { useSelector } from "react-redux";
import { useAppSelector } from ".";
import { API } from "../constants";
import Axios from "../services/axios";
import React from "react";

export default function useAccessCard() {
  const [access, setAccess] = React.useState();
  const categoryId = useSelector(state=>state.visitor.visitorData);
  const userData = useAppSelector((state) => state.auth);


  const getAccessCard = async () => {
    try {
      const response = await Axios.get(`${API.V1.ACCESS_CARD}?category_number=${categoryId.visitorType}&address=${userData.adminUserId}`);
      const data = await response.data;
      setAccess(data);
    } catch (e) {
      console.log("Error getting access card");
    }
  };
  return { access, getAccessCard };
}
