import axios from "axios";
import { apiUrl } from "../../config/config";
import { config } from "../../utils/axiosConfig";
import { ReviewType } from "./productSlice";

const popularProducts = async () => {
  const response = await axios.get(`${apiUrl}products/popular`, config);

  return response.data;
};

const featuredProducts = async () => {
  const response = await axios.get(`${apiUrl}products/featured`, config);

  return response.data;
};

const specialProducts = async () => {
  const response = await axios.get(`${apiUrl}products/special`, config);

  return response.data;
};

const productBySlug = async (slug: string) => {
  const response = await axios.get(`${apiUrl}products/slug/${slug}`);

  return response.data;
};

const productByCategory = async (id: string) => {
  const response = await axios.get(`${apiUrl}products/category/${id}`);

  return response.data;
};

const productByBrand = async (id: string) => {
  const response = await axios.get(`${apiUrl}products/brand/${id}`);

  return response.data;
};

const getAllProducts = async () => {
  const response = await axios.get(`${apiUrl}products/`);

  return response.data;
};

const addReview = async (data: ReviewType) => {
  const { id, ...restData } = data;
  const response = await axios.put(
    `${apiUrl}products/add-review/${id}`,
    restData,
    config
  );

  return response.data;
};

const updateReview = async (data: ReviewType) => {
  const { id, ...restData } = data;
  const response = await axios.put(
    `${apiUrl}products/update-review/${id}`,
    restData,
    config
  );

  return response.data;
};

const deleteReview = async (data: ReviewType) => {
  const { id, ...restData } = data;
  const response = await axios.put(
    `${apiUrl}products/delete-review/${id}`,
    restData,
    config
  );

  return response.data;
};

const productService = {
  popularProducts,
  featuredProducts,
  specialProducts,
  productBySlug,
  productByCategory,
  productByBrand,
  getAllProducts,
  addReview,
  updateReview,
  deleteReview,
};

export default productService;
