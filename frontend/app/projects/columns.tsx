"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";

import { DataTableColumnHeader } from "./column-header";
import { RowActions } from "./row-actions";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
// export type Company = {
//   id: number;
//   name: string;
//   alias: string;
//   isDeleted: string;
// };

import { Project } from "@/lib/types";

export const columns: ColumnDef<Project>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "company",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-center flex justify-left items-center"
        column={column}
        title="Company"
      />
    ),
    cell: ({ row }) => {
      const company = row.original.company as { id: number; name?: string } | null | undefined;
      return <div>{company?.name ?? row.original.companyId ?? "—"}</div>;
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="justify-left flex items-center text-center"
        column={column}
        title="Project Name"
      />
    ),
  },
  {
    accessorKey: "alias",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="justify-left flex items-center text-center"
        column={column}
        title="Alias"
      />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="justify-left flex items-center text-center"
        column={column}
        title="Status"
      />
    ),
    cell: ({ row }) => {
      return <h1>{row.original.isDeleted ? "Deleted" : "Active"}</h1>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const project = row.original;

      return (
        <div className="flex justify-end text-center">
          <RowActions project={project} />
        </div>
      );
    },
  },
];
