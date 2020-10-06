import axios from "axios";

export const http = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 100000,
  responseType: "json"
});
