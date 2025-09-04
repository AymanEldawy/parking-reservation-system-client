// services/api.ts
import axios, { type AxiosInstance } from "axios";
const HTTP_BASE = "http://localhost:3000/api/v1";

const api: AxiosInstance = axios.create({
  baseURL: HTTP_BASE,
  headers: { "Content-Type": "application/json" },
});

// If you ever add HTTP auth, set your token in localStorage("authToken")
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

/* ---- Auth ---- */
export const AuthService = {
  login: (data: { username: string; password: string }) =>
    api.post("/auth/login", data),
};

/* ---- Master ---- */
export const MasterService = {
  getGates: () => api.get("/master/gates"),
  getZones: (gateId?: string) =>
    api.get("/master/zones", { params: gateId ? { gateId } : {} }),
  getCategories: () => api.get("/master/categories"),
};

/* ---- Subscriptions ---- */
export const SubscriptionService = {
  getById: (id: string) => api.get(`/subscriptions/${id}`),
};

/* ---- Tickets ---- */
export const TicketService = {
  checkin: (data: {
    gateId: string;
    zoneId: string;
    type: "visitor" | "subscriber";
    subscriptionId?: string;
  }) => api.post("/tickets/checkin", data),

  checkout: (data: { ticketId: string; forceConvertToVisitor?: boolean }) =>
    api.post("/tickets/checkout", data),

  getById: (id: string) => api.get(`/tickets/${id}`),
};

/* ---- Admin ---- */
export const AdminService = {
  getParkingState: () => api.get("/admin/reports/parking-state"),
  updateCategory: (id: string, body: Partial<{
    rateNormal: number;
    rateSpecial: number;
    name: string;
    description: string;
  }>) => api.put(`/admin/categories/${id}`, body),

  setZoneOpen: (id: string, open: boolean) =>
    api.put(`/admin/zones/${id}/open`, { open }),

  createRushHours: (data: { weekDay: number; from: string; to: string }) =>
    api.post("/admin/rush-hours", data),

  createVacation: (data: { name: string; from: string; to: string }) =>
    api.post("/admin/vacations", data),

  getSubscriptions: () => api.get("/admin/subscriptions"),
};