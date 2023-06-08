export const getStorage = () => {
  return localStorage.getItem("accessToken");
};

const storage = getStorage();
const token = storage ? storage : "";

export const config = {
  withCredentials: true,
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  },
};

export const fileConfig = {
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${token}`,
  },
};

export const saveStorage = (token: string) => {
  return localStorage.setItem("accessToken", token);
};
