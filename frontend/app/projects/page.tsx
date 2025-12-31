"use client";

import { useState } from "react";
import { columns } from "./columns";
import { Project, Company } from "@/lib/types";
import { DataTable } from "./data-table";

import { TableContainer } from "./table-container";

import useSWR from "swr";
const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

export default function DemoPage() {
  const { data: projectsData } = useSWR<Project[]>(
    process.env.NEXT_PUBLIC_BACKEND_URI + "/projects",
    fetcher,
    { revalidateOnFocus: false },
  );

  const { data: companiesData } = useSWR<Company[]>(
    process.env.NEXT_PUBLIC_BACKEND_URI + "/companies",
    fetcher,
    { revalidateOnFocus: false },
  );

  const projects: Project[] = projectsData || [];
  const companies: Company[] = companiesData || [];

  const projectsWithCompany: Project[] = (projectsData || []).map((p) => ({
    ...p,
    company: companies.find((c) => c.id === p.companyId) ?? null,
  }));

  return (
    <TableContainer title="Projects Data Table">
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={projectsWithCompany} />
      </div>
    </TableContainer>
  );
}
