import axios from "axios";

const URL = "./api";

const Api = axios.create({
  timeout: 10000,
  baseURL: URL,
});

export default Api;
