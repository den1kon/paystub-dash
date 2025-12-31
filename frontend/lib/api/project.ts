import { Project } from "../types";
import { request } from "./request";

export async function postProject(
    name: string,
    companyId: number | null,
    alias: string | null,
): Promise<Project> {
    return request<Project>("/projects", {
        method: "POST",
        body: { name, companyId, alias },
    });
}

export async function getProjects(): Promise<Project[]> {
    return request<Project[]>("/projects", {
        method: "GET",
        cache: "no-store",
    });
}

export async function deleteProject(id: number): Promise<void> {
    await request<void>(`/projects/${id}`, { method: "DELETE" });
}

export async function updateProject(
    id: number,
    companyId: number | null,
    name: string,
    alias: string | null,
): Promise<Project | void> {
    return request<Project | void>(`/projects/${id}`, {
        method: "PUT",
        body: { name, companyId, alias },
    });
}