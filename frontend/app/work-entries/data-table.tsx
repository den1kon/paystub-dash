"use client";

import * as React from "react";

import { AddWorkEntryButton } from "./add-work-entry";
import { useIsMobile } from "@/hooks/use-mobile";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  VisibilityState,
  SortingState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Input } from "@/components/ui/input";

import { DataTablePagination } from "./pagination";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  mobileHiddenColumns?: string[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
  mobileHiddenColumns = [
    "id",
    "description",
    "qualification",
    "status",
  ],
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [rowSelection, setRowSelection] = React.useState({});
  const isMobile = useIsMobile();
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  // derive actual column ids from the columns prop so we don't depend on the
  // `table` instance (which is a new object each render) and cause effect
  // re-runs. We only want to touch visibility for columns that exist.
  const columnIds = React.useMemo(() => {
    return columns
      .map((c) => (c.id ?? (c as any).accessorKey ?? undefined))
      .filter((v): v is string => typeof v === "string");
  }, [columns]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      rowSelection,
      columnVisibility,
    },
  });

  // Sync column visibility with mobile state.
  // Run after table is initialized so we can check actual column ids.
  React.useEffect(() => {
    // update visibility only when something actually changes to avoid
    // infinite re-renders (setting state to same object still triggers a
    // render in some cases). We use the derived `columnIds` instead of the
    // `table` object so the dependency list is stable.
    setColumnVisibility((prev) => {
      const next = { ...prev };
      let changed = false;

      if (isMobile) {
        mobileHiddenColumns.forEach((id) => {
          if (columnIds.includes(id) && next[id] !== false) {
            next[id] = false;
            changed = true;
          }
        });
      } else {
        mobileHiddenColumns.forEach((id) => {
          if (id in next) {
            delete next[id];
            changed = true;
          }
        });
      }

      return changed ? next : prev;
    });
  }, [isMobile, mobileHiddenColumns, columnIds]);

  return (
    <div>
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Filter by date..."
          value={
            (table.getColumn("workDate")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("workDate")?.setFilterValue(event.target.value)
          }
          className="max-w-sm w-fit"
        />
        <AddWorkEntryButton />
      </div>
      <div className="w-full max-w-full overflow-x-auto rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead className="text-left" key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="text-left" key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
