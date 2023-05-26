import axios from "axios";
import { apiUrl } from "../../config/config";
import { config } from "../../utils/axiosConfig";

const loadAUser = async () => {
  const response = await axios.get(`${apiUrl}auth/verify-user`, config);

  return response.data;
};



const authService = {
  loadAUser,
};

export default authService;
