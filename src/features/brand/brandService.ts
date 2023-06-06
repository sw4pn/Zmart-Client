import axios from "axios";
import { apiUrl } from "../../config/config";
import { config } from "../../utils/axiosConfig";

const addBrand = async (data: any) => {
  const response = await axios.post(`${apiUrl}brands/`, data, config);

  return response.data;
};

// const getFeaturedCategories = async () => {
//   const response = await axios.get(`${apiUrl}categories/featured`, config);

//   return response.data;
// };

const getAllBrands = async () => {
  const response = await axios.get(`${apiUrl}brands/`, config);

  return response.data;
};

const getABrand = async (id: string) => {
  const response = await axios.get(`${apiUrl}brands/${id}`, config);

  return response.data;
};

const updateABrand = async (data: any) => {
  const response = await axios.put(`${apiUrl}brands/${data.id}`, data, config);

  return response.data;
};

const deleteABrand = async (id: string) => {
  const response = await axios.delete(`${apiUrl}brands/${id}`, config);

  return response.data;
};

const brandService = {
  addBrand,
  getAllBrands,
  getABrand,
  updateABrand,
  deleteABrand,
};

export default brandService;
