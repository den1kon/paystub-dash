import { Company } from "./types";

const urlBase = process.env.BACKEND_URI?.toString() ||
    "http://localhost:8080/api/v0";

type RequestOptions = {
    method?: "GET" | "POST" | "PUT" | "DELETE";
    body?: unknown;
    headers?: Record<string, string>;
    cache?: RequestCache;
    timeoutMs?: number;
};

class ApiError extends Error {
    status: number;
    body?: unknown;
    constructor(message: string, status: number, body?: unknown) {
        super(message);
        this.status = status;
        this.body = body;
    }
}

async function request<T>(path: string, opts: RequestOptions = {}): Promise<T> {
    const { method = "GET", body, headers = {}, timeoutMs = 10_000 } = opts;
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeoutMs);

    const fetchOpts: RequestInit = {
        method,
        signal: controller.signal,
        headers: { ...headers },
    };

    if (body !== undefined) {
        fetchOpts.body = JSON.stringify(body);
        fetchOpts.headers = {
            "Content-Type": "application/json",
            ...fetchOpts.headers,
        };
    }

    let res: Response;
    try {
        res = await fetch(`${urlBase}${path}`, fetchOpts);
    } catch (err) {
        clearTimeout(id);
        if ((err as Error).name === "AbortError") {
            throw new ApiError("Request timed out", 0);
        }
        throw new ApiError((err as Error).message || "Network error", 0);
    }
    clearTimeout(id);

    const contentType = res.headers.get("content-type") || "";
    const hasJson = contentType.includes("application/json");

    if (!res.ok) {
        let parsedBody: unknown = undefined;
        if (hasJson) {
            try {
                parsedBody = await res.json().catch(() => undefined);
            } catch {}
        } else {
            parsedBody = await res.text().catch(() => undefined);
        }
        throw new ApiError(
            parsedBody ? String(parsedBody) : `Request failed: ${res.status}`,
            res.status,
            parsedBody,
        );
    }

    // 204 No Content
    if (res.status === 204 || res.headers.get("content-length") === "0") {
        // @ts-ignore
        return undefined;
    }

    if (hasJson) {
        return (await res.json()) as T;
    }

    // fallback: return raw text if generic T is string
    const text = await res.text().catch(() => "");
    // @ts-ignore
    return text;
}

export async function postCompany(
    name: string,
    alias: string | null,
): Promise<Company> {
    return request<Company>("/companies", {
        method: "POST",
        body: { name, alias },
    });
}

export async function getCompanies(): Promise<Company[]> {
    return request<Company[]>("/companies", {
        method: "GET",
        cache: "no-store",
    });
}

export async function deleteCompany(id: number): Promise<void> {
    await request<void>(`/companies/${id}`, { method: "DELETE" });
}

export async function updateCompany(
    id: number,
    name: string,
    alias: string | null,
): Promise<Company | void> {
    return request<Company | void>(`/companies/${id}`, {
        method: "PUT",
        body: { name, alias },
    });
}
