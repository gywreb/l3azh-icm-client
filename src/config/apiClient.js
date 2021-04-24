import axios from "axios";

const baseURL = "http://139.180.196.41:9090/api";

const apiClient = axios.create({ baseURL });

export default apiClient;
