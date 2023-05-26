import axios from "axios";
import { apiUrl } from "../../config/config";
import { config } from "../../utils/axiosConfig";

const addCategory = async (data) => {
  const response = await axios.post(`${apiUrl}categories/`, data, config);

  return response.data;
};

const getFeaturedCategories = async () => {
  const response = await axios.get(`${apiUrl}categories/featured`, config);

  return response.data;
};

const getAllCategories = async () => {
  const response = await axios.get(`${apiUrl}categories/`, config);

  return response.data;
};

const getACategory = async (id: string) => {
  const response = await axios.get(`${apiUrl}categories/${id}`, config);

  return response.data;
};

const updateACategory = async (data) => {
  const response = await axios.put(
    `${apiUrl}categories/${data.id}`,
    data,
    config
  );

  return response.data;
};

const deleteACategory = async (id) => {
  const response = await axios.delete(`${baseUrl}categories/${id}`, config);

  return response.data;
};

const categoryService = {
  addCategory,
  getFeaturedCategories,
  getAllCategories,
  getACategory,
  updateACategory,
  deleteACategory,
};

export default categoryService;
