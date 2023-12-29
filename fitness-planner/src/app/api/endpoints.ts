//TODO: add .env
import { Guid } from "guid-typescript";

const API_URL = "https://localhost:44323/api";

export interface ApiBasePath {
  get: (id: Guid) => string;
  create: () => string;
  delete: (id: Guid) => string;
  add: () => string;
  getAll: () => string;
  update: () => string;
}

export const ApiModulePath: ApiBasePath = {
  get: (id: Guid) => `${API_URL}/Module/${id}`,
  create: () => `${API_URL}/Module`,
  delete: (id: Guid) => `${API_URL}/Module/${id}`,
  add: () => `${API_URL}/Module`,
  getAll: () => `${API_URL}/Module`,
  update: () => `${API_URL}/Module`
};

export const ApiCalendarPath: ApiBasePath = {
  get: (id: Guid) => `${API_URL}/Calendar/${id}`,
  create: () => `${API_URL}/Calendar`,
  delete: (id: Guid) => `${API_URL}/Calendar/${id}`,
  add: () => `${API_URL}/Calendar`,
  getAll: () => `${API_URL}/Calendar`,
  update: () => `${API_URL}/Calendar`
};
