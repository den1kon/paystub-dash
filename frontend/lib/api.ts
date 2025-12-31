import { Company } from "./types";

const BASE = "http://localhost:8080/api/v0";

export async function postCompany(
    name: string,
    alias: string | null,
): Promise<Company> {
    const url = `${BASE}/companies`;
    const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, alias }),
    });

    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || `Request failed: ${res.status}`);
    }

    return res.json();
}

export async function getCompanies(): Promise<Company[]> {
    const url = `${BASE}/companies`;
    const res = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        // Remove or change this if you want caching:
        cache: "no-store",
    });

    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || `Request failed: ${res.status}`);
    }

    //   console.log(res.json);
    return res.json();
}

export async function deleteCompany(id: number): Promise<void> {
    const url = `${BASE}/companies/${id}`;
    return fetch(url, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    }).then((res) => {
        if (!res.ok) {
            return res.text().then((text) => {
                throw new Error(text || `Request failed: ${res.status}`);
            });
        }
    });
}

export async function updateCompany(
    id: number,
    name: string,
    alias: string | null,
): Promise<void> {
    const url = `${BASE}/companies/${id}`;
    return fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, alias }),
    }).then((res) => {
        if (!res.ok) {
            return res.text().then((text) => {
                throw new Error(text || `Request failed: ${res.status}`);
            });
        }
    });
}
