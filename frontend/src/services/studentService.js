import api from "./api";

export const viewstudent = () => api.get("/student/viewall");
export const Studenthistory = (id) => api.get(`/student/history/${id}`);
export const allstats = (id) => api.get(`/student/allstats/${id}`)
