"use client";

import { useState } from "react";
import { columns} from "./columns";
import { Company } from "@/lib/types";
import { DataTable } from "./data-table";

import { TableContainer } from "./table-container";

const companies: Company[] = [
  { id: 1, name: "Acme Corp", alias: "Acme", isDeleted: false },
  { id: 2, name: "Globex Inc", alias: "Globex", isDeleted: true },
];

import useSWR from "swr";
const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

export default function DemoPage() {
  const { data, error, isLoading } = useSWR<Company[]>(
    process.env.NEXT_PUBLIC_BACKEND_URI + "/companies",
    fetcher,
    { revalidateOnFocus: false }
  );

  const companies: Company[] = data || [];

  return (
    <TableContainer title="Companies Data Table">
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={companies} />
      </div>
    </TableContainer>
  );
}
