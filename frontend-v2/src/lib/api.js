import axios from "axios";

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

export const api = axios.create({
  baseURL: API,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function submitLead(payload) {
  const { data } = await api.post("/leads", payload);
  return data;
}

export async function fetchLeads(token) {
  const { data } = await api.get("/leads", {
    headers: { "X-Admin-Token": token },
  });
  return data;
}
