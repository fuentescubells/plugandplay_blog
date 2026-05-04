import axios, { AxiosError } from "axios";
import { logger } from "../utils/logger";

const wpUser = process.env.WP_USER;
const wpPassword = process.env.WP_APP_PASSWORD;

export const wpApi = axios.create({
  baseURL: process.env.WORDPRESS_API_URL + "/wp/v2",
  timeout: 8000,
  headers: {
    "Content-Type": "application/json",
    ...(wpUser && wpPassword
      ? { Authorization: "Basic " + Buffer.from(`${wpUser}:${wpPassword}`).toString("base64") }
      : {}),
  },
});

wpApi.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status;

    logger.error(`[WP API] ${status ?? "Network error"} — ${error.config?.url}`);

    if (!error.response) {
      // Sin respuesta: timeout, DNS, red caída
      return Promise.reject(Object.assign(error, { isNetworkError: true }));
    }

    if (status && status >= 500) {
      return Promise.reject(Object.assign(error, { isMaintenance: true }));
    }

    if (status === 404) {
      return Promise.reject(Object.assign(error, { isNotFound: true }));
    }

    if (status === 401 || status === 403) {
      return Promise.reject(Object.assign(error, { isUnauthorized: true }));
    }

    return Promise.reject(error);
  }
);

export default wpApi;
