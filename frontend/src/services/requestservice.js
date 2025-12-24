import api from "./api";


export const newRequest = (selectedBook,issueDate,student_id)=> api.post("/student/issuebookreq",{selectedBook,issueDate,student_id})
export const fetchAllRequest = ()=> api.get("/request/all")
export const updateReq = (requestId, payload) =>
  api.patch(`/request/updatestatus/${requestId}`, payload);
export const returnBook = (id, data) => {
  return api.put(`/request/return/${id}`, data);
};