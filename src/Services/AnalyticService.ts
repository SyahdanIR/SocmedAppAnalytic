import { api } from "./Api";
import * as SecureStore from "expo-secure-store";

export const getPopularThread = async () => {
  try {
    const token = await SecureStore.getItemAsync("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await api.get("/analytic", config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCountData = async () => {
  try {
    const token = await SecureStore.getItemAsync("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await api.get("/analytic/count", config);
    return response.data;
  } catch (error) {
    throw error;
  }
};
