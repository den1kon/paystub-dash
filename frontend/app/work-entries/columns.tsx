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

import { WorkEntry } from "@/lib/types";

export const columns: ColumnDef<WorkEntry>[] = [
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
    accessorKey: "projectId",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="justify-left flex items-center text-center"
        column={column}
        title="Project"
      />
    ),
    cell: ({ row }) => {
      const project = row.original.project as
        | { id: number; name?: string }
        | null
        | undefined;
      return <div>{project?.name ?? row.original.projectId ?? "—"}</div>;
    },
  },
  {
    accessorKey: "workDate",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="justify-left flex items-center text-center"
        column={column}
        title="Date"
      />
    ),
  },
  {
    accessorKey: "startTime",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="justify-left flex items-center text-center"
        column={column}
        title="Start Time"
      />
    ),
  },
  {
    accessorKey: "endTime",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="justify-left flex items-center text-center"
        column={column}
        title="End Time"
      />
    ),
  },
  {
    accessorKey: "qualification",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="justify-left flex items-center text-center"
        column={column}
        title="Qualification"
      />
    ),
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="justify-left flex items-center text-center"
        column={column}
        title="Description"
      />
    ),
    cell: ({ row }) => {
      const desc = row.original.description as string | null | undefined;
      return <div className="whitespace-pre">{desc ?? "—"}</div>;
    },
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
      const workEntry = row.original;

      return (
        <div className="flex justify-end text-center">
          <RowActions workEntry={workEntry} />
        </div>
      );
    },
  },
];
