import { api } from "./Api";
import * as SecureStore from "expo-secure-store";

export const getPopularThread = async (filter = "all_threads", page = 1) => {
  try {
    const token = await SecureStore.getItemAsync("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await api.get(`/analytic`, {
      params: { selectedFilter: filter, page: page, limit: 6 },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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

export const getNotification = async () => {
  try {
    const token = await SecureStore.getItemAsync("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await api.get("/analytic/notif", config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getFollowerAnalytic = async () => {
  try {
    const token = await SecureStore.getItemAsync("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await api.get("/analytic/growth", config);
    return response.data;
  } catch (error) {
    throw error;
  }
};
