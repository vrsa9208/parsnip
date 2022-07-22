import axios from "axios";

const API_BASE_URL = "http://localhost:3001";

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export function fetchTasks() {
  return client.get("/tasks");
}

export function createTasks(params) {
  return client.post("/tasks", params);
}

export function updateTask(id, params) {
  return client.put(`/tasks/${id}`, params);
}
