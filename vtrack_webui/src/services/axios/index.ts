import Axios from "axios";
import { setupInterceptorsTo } from "./interceptors";

const axios = setupInterceptorsTo(
  Axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 10000,
    headers: { "Content-Type": "application/json" },
  })
);

export default axios;
