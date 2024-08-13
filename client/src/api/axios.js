import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000", // Ensure this matches your backend URL
  withCredentials: true, // If you're using cookies or need to send credentials
});

export default instance;
