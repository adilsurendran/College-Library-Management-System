import api from "./api";


export const fetchallstats = ()=> api.get("/admin/statsall")