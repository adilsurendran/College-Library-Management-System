

// import axios from "axios";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
// });
// // console.log(import.meta.env.VITE_API_URL);

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
  
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

// export default api;


import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // IMPORTANT: allow cookies
});

// Request → attach token
api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Response → if token expired, auto refresh
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 403) {

      // call refresh token API
      const refreshRes = await axios.get(
        `${import.meta.env.VITE_API_URL}/refresh-token`,
        { withCredentials: true }
      );

      if (refreshRes.data.accessToken) {
        localStorage.setItem("accessToken", refreshRes.data.accessToken);

        error.config.headers.Authorization = `Bearer ${refreshRes.data.accessToken}`;

        return api(error.config); // retry original request
      }
    }

    return Promise.reject(error);
  }
);

export default api;
