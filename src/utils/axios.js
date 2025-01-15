import axios from "axios";

const instance = axios.create({
  // baseURL:'http://127.0.0.1:4444',
  // baseURL:'http://localhost:4444',
  baseURL: "https://eventrsvp-backend.vercel.app",
  withCredentials: true,
});

export default instance;
