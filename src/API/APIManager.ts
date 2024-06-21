import axios from "axios";

export const ApiManager = axios.create({
  baseURL: `https://pwdemo.mygps.ge:4542/`,
  responseType: "json",
  withCredentials: true,
  httpsAgent: {
    rejectUnauthorized: false,
  },
});