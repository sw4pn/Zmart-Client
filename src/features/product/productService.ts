import axios from "axios";
import { apiUrl } from "../../config/config";
import { config } from "../../utils/axiosConfig";

const popularProducts = async () => {
  const response = await axios.get(`${apiUrl}products/popular`, config);

  return response.data;
};

const productService = {
  popularProducts,
};

export default productService;
