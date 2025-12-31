"use client";

import { useState } from "react";
import { columns} from "./columns";
import { Company } from "@/lib/types";
import { DataTable } from "./data-table";

import { TableContainer } from "./table-container";
import { getCompanies } from "@/lib/api";

const companies: Company[] = [
  { id: 1, name: "Acme Corp", alias: "Acme", isDeleted: false },
  { id: 2, name: "Globex Inc", alias: "Globex", isDeleted: true },
];

import useSWR from "swr";
const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

export default function DemoPage() {
  // // const data = await getCompanies();
  // const { data, error, isLoading } = useSWR('http://100.68.20.67:8080/api/v0/companies', fetcher);
  // // console.log(data);
  // const dataa = data as Company[] || [];

  // console.log(data);
  // console.log(dataa);

  const { data, error, isLoading } = useSWR<Company[]>(
    "http://localhost:8080/api/v0/companies",
    fetcher,
    { revalidateOnFocus: false }
  );

  const companie: Company[] = data || [];

  return (
    <TableContainer title="Companies Data Table">
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={companie} />
        {/* <DataTableDemo /> */}
      </div>
    </TableContainer>
  );
}
