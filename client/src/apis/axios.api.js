import axios from "axios";

export const instance = axios.create({ baseURL: "http://localhost:5000" });

/*
    Still not sure what the interceptor really does, or if it's even being used.
    
    For future versions, it could be possible that interceptors are responsible
    for the malformed JWT issue that was being experienced in the backend authorization.
*/
instance.interceptors.request.use((req) => {
  if (localStorage.getItem("account")) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("account")).token}`;
  }

  return req;
});
