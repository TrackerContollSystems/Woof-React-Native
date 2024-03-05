import axios from "axios";

export const ApiManager = axios.create({
  baseURL: `http://192.168.1.111:5165/`,
  responseType: "json",
  withCredentials: true,
  httpsAgent: {
    rejectUnauthorized: false,
  },
});
