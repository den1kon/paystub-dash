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