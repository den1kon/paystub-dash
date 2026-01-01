"use client";

import { useState } from "react";
import { columns } from "./columns";
import { WorkEntry, Project } from "@/lib/types";
import { DataTable } from "./data-table";

import { TableContainer } from "./table-container";

import useSWR from "swr";
const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

export default function DemoPage() {
  const { data: workEntriesData } = useSWR<WorkEntry[]>(
    process.env.NEXT_PUBLIC_BACKEND_URI + "/work-entries",
    fetcher,
    { revalidateOnFocus: false },
  );

  const { data: projectsData } = useSWR<Project[]>(
    process.env.NEXT_PUBLIC_BACKEND_URI + "/projects",
    fetcher,
    { revalidateOnFocus: false },
  );

  const workEntries : WorkEntry[] = workEntriesData || [];
  const projects: Project[] = projectsData || [];

  const workEntriesWithProject: WorkEntry[] = (workEntries || []).map((we) => ({
    ...we,
    project: projects.find((p) => p.id === we.projectId) ?? null,
  }));

  return (
    <TableContainer title="Work Entries Data Table">
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={workEntriesWithProject} />
      </div>
    </TableContainer>
  );
}
