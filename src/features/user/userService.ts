import axios from "axios";
import { apiUrl } from "../../config/config";
import { config } from "../../utils/axiosConfig";
import { regUser } from "./userSlice";

const createUser = async (data: regUser) => {
  const response = await axios.post(`${apiUrl}users/`, data, config);

  return response.data;
};

const userService = {
  createUser,
};

export default userService;
