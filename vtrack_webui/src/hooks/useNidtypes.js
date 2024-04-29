import { useState } from "react";
import { API } from "../constants";
import Axios from "../services/axios";

export default function useNidtypes() {
  const [nidtypesData, setNidtypesData] = useState([]);
  const [loading, setLoading] = useState([]);
  const getNidtypes = async () => {
    try {
      const response = await Axios.get(API.V1.NID_TYPES);
      const data = await response.data;
      setNidtypesData(data);
      setLoading(false);
      return data;
    } catch (error) {
      console.log("Error submitting user info:", error);
    } finally {
      setLoading(false);
    }
  };
  return { nidtypesData, getNidtypes, loading };
}
