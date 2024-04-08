import { useState } from "react";
import { API } from "../constants";
import Axios from "../services/axios";

export default function useCategory() {
  const [catergoriesData, setCategoriesData] = useState([]);
  const [loading, setLoading] = useState([]);
  const getCatergory = async () => {
    try {
      const response = await Axios.get(API.V1.VISIT_CATEGORIES);
      const data = await response.data;
      setCategoriesData(data);
      setLoading(false);
      return data;
    } catch (error) {
      console.log("Error submitting user info:", error);
    } finally {
      setLoading(false);
    }
  };
  return {catergoriesData, getCatergory, loading};
}
