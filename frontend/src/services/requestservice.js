import api from "./api";


export const newRequest = (selectedBook,issueDate,returnDate,student_id)=> api.post("/student/issuebookreq",{selectedBook,issueDate,returnDate,student_id})
export const fetchAllRequest = ()=> api.get("/request/all")
export const updateReq = (requestId, newStatus) => api.patch(`/request/updatestatus/${requestId}`,{newStatus});
export const returnBook = (id, data) => {
  return api.put(`/request/return/${id}`, data);
};