import { FormData } from "@/app/types/register.user.dto";
import { urls } from "@/config/config";
import axios from "axios";

const registerUser = async (payload: FormData) => {
  try {
    const response = await axios.post(`${urls.apiUrl}users/register`, payload);
    return response.data;
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    throw error;
  }
};

export default registerUser;
