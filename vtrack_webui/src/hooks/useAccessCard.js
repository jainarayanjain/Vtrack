import { API } from "../constants";
import Axios from "../services/axios";
import React from "react";

export default function useAccessCard() {
  const [access, setAccess] = React.useState();

  const getAccessCard = async () => {
    try {
      const response = await Axios.get(API.V1.ACCESS_CARD);
      const data = await response.data;
      setAccess(data);
    } catch (e) {
      console.log("Error getting access card");
    }
  };
  return { access, getAccessCard };
}
