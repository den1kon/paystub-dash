import { Company } from "../types";
import { request } from "./request";

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