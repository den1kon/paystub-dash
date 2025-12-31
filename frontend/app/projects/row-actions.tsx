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

import { Project } from "@/lib/types";
import { useSWRConfig } from "swr";

import { EditProjectDialog } from "./edit-project";

export function RowActions({ project }: { project: Project }) {
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
              await deleteProject(project.id);
              await mutate(process.env.NEXT_PUBLIC_BACKEND_URI + "/projects");
            }}
          >
            Delete project
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* <DialogTrigger asChild>
        <DropdownMenuItem>Edit project</DropdownMenuItem>
      </DialogTrigger> */}

      <EditProjectDialog project={project} setOpen={setOpen} open={open} />
    </Dialog>
  );
}
