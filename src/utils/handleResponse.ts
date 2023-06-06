import { toast } from "react-hot-toast";

export const handleError = (err: any) => {
  if (err.response) {
    if (err.response.status === 400) {
      toast.error(err.response.data.error);
    } else if (err.response.status === 404) {
      toast.error("Not found.");
    } else if (err.response.status === 401) {
      toast.error("Unauthorized Access! Please login again");
    } else if (err.response.status === 403) {
      toast.error("Forbidden! You are not allowed to access this resource.");
    }
  } else if (err.message) {
    toast.error(err.message);
  } else {
    toast.error("Your request could not be processed. Please try again.");
  }
};
