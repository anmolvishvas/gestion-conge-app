import axios from "axios";

export const API_URL = "https://localhost:8000/api";
// export const API_URL = "https://gestion-conge.devanmol.tech/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/ld+json",
    Accept: "application/ld+json",
  },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
    return config;
  }

  // Use application/json only for login endpoint
  if (config.url === '/login') {
    config.headers["Content-Type"] = "application/json";
    config.headers["Accept"] = "application/json";
    return config;
  }

  // For all other endpoints, use application/ld+json
  config.headers["Content-Type"] = "application/ld+json";
  config.headers["Accept"] = "application/ld+json";
  return config;
});

api.interceptors.response.use(
  (response) => {
    if (response.data && response.data["@context"]) {
      return response;
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
