import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "./Api";
import * as SecureStore from "expo-secure-store";

export const login = async (emailorusername: string, password: string) => {
  try {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    const response = await api.post(
      `/auth/login`,
      {
        emailorusername,
        password,
      },
      config,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const token = await SecureStore.getItemAsync("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await api.get("/auth/me", config);
    return response.data;
  } catch (error) {
    throw error;
  }
};
