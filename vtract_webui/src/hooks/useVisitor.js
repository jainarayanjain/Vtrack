import { useState } from "react";
import { API } from "../constants";
import Axios from "../services/axios";



export default function useRecordSubmit() {
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(false);

  const submitRecord = async (payload) => {
    try {
      const response = await Axios.post(API.V1.RECORD_SUBMIT , payload);
      const data = await response.data;
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
