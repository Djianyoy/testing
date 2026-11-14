import axios from "axios";
import { publicApiUrl, useProxy } from "./base-url";

export const api = axios.create({
  baseURL: useProxy ? "/api" : publicApiUrl,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err.response?.status as number | undefined;
    const message: string =
      err.response?.data?.message ?? err.message ?? "Terjadi kesalahan";
    if (status === 401) {
      // TODO: redirect ke /login
    }
    return Promise.reject(new Error(message));
  },
);
