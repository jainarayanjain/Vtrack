import { useState } from "react";
import { API } from "../constants";
import Axios from "../services/axios";
import { useNavigate } from "react-router-dom";



export default function useRecordSubmit() {
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(false);
  const navigate= useNavigate();

  const submitRecord = async (payload) => {
    try {
      const response = await Axios.post(API.V1.VISITOR_DETAILS , payload);
      const data = await response.data;
      if(data.status===200){
        navigate('/host-details')
      }
      setUserData(data);
      setLoading(false);
      return data;
    } catch (error) {
      console.log("Error submitting user info:", error);
    } finally {
      setLoading(false);
    }
  };

  return { userData, loading, submitRecord };
}
