import axios from "axios";
import { apiUrl } from "../../config/config";
import { config } from "../../utils/axiosConfig";
import { regUser } from "./userSlice";
import { User } from "../../types";

const createUser = async (data: regUser) => {
  const response = await axios.post(`${apiUrl}users/`, data, config);

  return response.data;
};

const getAllUsers = async () => {
  const response = await axios.get(`${apiUrl}users/`, config);

  return response.data;
};

const getAUser = async (id: string) => {
  const response = await axios.get(`${apiUrl}users/${id}`, config);

  return response.data;
};

const updateAUser = async (user: User) => {
  const response = await axios.put(`${apiUrl}users/${user.id}`, user, config);

  return response.data;
};

const deleteAUser = async (id: string) => {
  const response = await axios.delete(`${apiUrl}users/${id}`, config);
  return response.data;
};

const changePassword = async (data: {
  password: string;
  newPassword: string;
}) => {
  const response = await axios.put(
    `${apiUrl}users/change-password`,
    data,
    config
  );

  return response.data;
};

const getWishlist = async () => {
  const response = await axios.get(`${apiUrl}users/wishlist`, config);

  return response.data;
};

const userService = {
  createUser,
  getAllUsers,
  getAUser,
  updateAUser,
  deleteAUser,
  changePassword,
  getWishlist,
};

export default userService;
