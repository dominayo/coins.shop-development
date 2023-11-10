import axios from "axios";

const config = {
  baseURL: process.env.VUE_APP_API_URL
};

export default axios.create(config);
