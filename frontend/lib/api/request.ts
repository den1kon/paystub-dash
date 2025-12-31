import { RequestOptions } from "../types";
import { ApiError } from "../errors";

const urlBase = process.env.NEXT_PUBLIC_BACKEND_URI?.toString() ||
    "http://localhost:8080/api/v0";

export async function request<T>(path: string, opts: RequestOptions = {}): Promise<T> {
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
