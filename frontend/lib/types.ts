export type RequestOptions = {
    method?: "GET" | "POST" | "PUT" | "DELETE";
    body?: unknown;
    headers?: Record<string, string>;
    cache?: RequestCache;
    timeoutMs?: number;
};

export type Company = {
  id: number;
  name: string;
  alias: string | null;
  isDeleted: boolean;
};

export type Project = {
  id: number;
  companyId: number | null;
  name: string;
  alias: string | null;
  isDeleted: boolean;
  company?: Company | null;
};

export type WorkEntry = {
  id: number;
  projectId: number | null;
  workDate: string;
  startTime: string;
  endTime: string;
  qualification: string;
  description: string | null;
  isDeleted: boolean;
  project?: Project | null;
};