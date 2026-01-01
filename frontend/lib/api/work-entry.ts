import { WorkEntry } from "../types";
import { request } from "./request";

export async function postWorkEntry(
    projectId: number | null,
    workDate: string,
    startTime: string,
    endTime: string,
    qualification: string,
    description: string | null,
): Promise<WorkEntry> {
    return request<WorkEntry>("/work-entries", {
        method: "POST",
        body: {
            projectId,
            workDate,
            startTime,
            endTime,
            qualification,
            description,
        },
    });
}

export async function getWorkEntries(): Promise<WorkEntry[]> {
    return request<WorkEntry[]>("/work-entries", {
        method: "GET",
        cache: "no-store",
    });
}

export async function deleteWorkEntry(id: number): Promise<void> {
    await request<void>(`/work-entries/${id}`, { method: "DELETE" });
}

export async function updateWorkEntry(
    id: number,
    projectId: number | null,
    workDate: string,
    startTime: string,
    endTime: string,
    qualification: string,
    description: string | null,
): Promise<WorkEntry | void> {
    return request<WorkEntry | void>(`/work-entries/${id}`, {
        method: "PUT",
        body: { projectId, workDate, startTime, endTime, qualification, description },
    });
}