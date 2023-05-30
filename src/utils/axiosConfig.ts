export const config = {
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
};

export const fileConfig = {
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
  },
};
