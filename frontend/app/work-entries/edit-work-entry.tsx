import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { updateProject } from "@/lib/api/project";
import { WorkEntry } from "@/lib/types";
import { mutate, useSWRConfig } from "swr";
import { updateWorkEntry } from "@/lib/api/work-entry";

export function EditWorkEntryDialog({ workEntry, setOpen, open }: { workEntry: WorkEntry, setOpen: React.Dispatch<React.SetStateAction<boolean>>, open: boolean }) {
  const { mutate } = useSWRConfig();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const workEntryId = workEntry.id;
    const projectName = formData.get("projectName") as string;

    console.log("Submitting edit for work entry ID:", workEntryId);
    console.log("Submitting edit for project Name:", projectName);
    // todo add validation

    // setLoading(true);
    // setOpen(false);
    try {
      await updateWorkEntry(workEntryId, null, '2025-09-09', '10:00', '13:00', 'qualif', null);
      //   setOpen(false);
      //   form.reset(); // clear the form
      //   router.refresh(); // refresh server-rendered data table
      await mutate(process.env.NEXT_PUBLIC_BACKEND_URI + "/work-entries");
    } catch (error) {
      console.error("Error adding work entry:", error);
      alert("Unexpected error. Report to admin.");
    } finally {
      //   form.reset();
      setOpen(false);
      //   setLoading(false);
      //   router.refresh();
    }
  };
  return (
    <DialogContent className="sm:max-w-106.25">
      <DialogHeader>
        <DialogTitle>Edit Company</DialogTitle>
        <DialogDescription>
          Edit the company details below and click "Save".
        </DialogDescription>
      </DialogHeader>
      <form id="edit-project-form" onSubmit={handleSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="projectName">Project Name</Label>
            <Input
              id="projectName"
              name="projectName"
              placeholder="e.g. HOBM's secret project"
              form="edit-project-form"
              defaultValue={""}
              autoFocus={false}
              required
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="projectAlias">(Optional) Project Alias</Label>
            <Input
              id="projectAlias"
              name="projectAlias"
              placeholder="Project Alias"
              form="edit-project-form"
              defaultValue={""}
            />
          </div>
        </div>

        <DialogFooter className="pt-6">
          <DialogClose asChild>
            <Button variant="outline" type="button" disabled={false}>
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" form="edit-project-form" disabled={false}>
            Save
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
