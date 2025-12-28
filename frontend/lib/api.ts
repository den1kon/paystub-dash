import { Company } from "./types";

const BASE = "http://localhost:8080/api/v0";

export async function postCompany(name: string): Promise<Company> {
  const url = `${BASE}/companies`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
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

  return res.json();
}