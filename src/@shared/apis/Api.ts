import axios from "axios";

const PRODUCTION_URL = "https://moai-log.vercel.app/api";
const DEV_URL = "http://localhost:3000/api";

const Api = axios.create({
  timeout: 10000,
  baseURL: process.env.PRODUCTION ? PRODUCTION_URL : DEV_URL,
});

export default Api;
