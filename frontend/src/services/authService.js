import api from "./api";

export const registerUser = async (formData) => {
  const res = await api.post("/register", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  console.log(res);
  
  return res.data;
};

// export const loginUser = async (data) => {
//   const res = await api.post("/login", data);
//   console.log(res);
  
//   return res.data;
// };

export const loginUser = async (data) => {
  const res = await api.post("/login", data, { withCredentials: true });
  return res.data;
};
