import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MoreHorizontal } from "lucide-react";

import { deleteCompany } from "@/lib/api";
import { useState } from "react";

import { Company } from "@/lib/types";
import { useSWRConfig } from "swr";

import { EditCompanyDialog } from "./edit-company";

export function RowActions({ company }: { company: Company }) {
  const { mutate } = useSWRConfig();
  const [open, setOpen] = useState(false);
  //   const [loading, setLoading] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className="flex justify-center text-center"
        >
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          {/* <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(company.id.toString())}
          >
            Copy company ID
          </DropdownMenuItem> */}
          <DropdownMenuSeparator />
          <DialogTrigger asChild>
            <DropdownMenuItem>Edit company</DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem
            onClick={async () => {
              console.log(company.id);
              await deleteCompany(company.id);
              await mutate("http://localhost:8080/api/v0/companies");
            }}
          >
            Delete company
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* <DialogTrigger asChild>
        <DropdownMenuItem>Edit company</DropdownMenuItem>
      </DialogTrigger> */}

      <EditCompanyDialog company={company} setOpen={setOpen} open={open} />
    </Dialog>
  );
}
