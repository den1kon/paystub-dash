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

import { deleteProject } from "@/lib/api/project";
import { useState } from "react";

import { WorkEntry } from "@/lib/types";
import { useSWRConfig } from "swr";

import { EditWorkEntryDialog } from "./edit-work-entry";
import { deleteWorkEntry } from "@/lib/api/work-entry";

export function RowActions({ workEntry }: { workEntry: WorkEntry }) {
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
              await deleteWorkEntry(workEntry.id);
              await mutate(process.env.NEXT_PUBLIC_BACKEND_URI + "/work-entries");
            }}
          >
            Delete work entry
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* <DialogTrigger asChild>
        <DropdownMenuItem>Edit project</DropdownMenuItem>
      </DialogTrigger> */}

      <EditWorkEntryDialog workEntry={workEntry} setOpen={setOpen} open={open} />
    </Dialog>
  );
}
