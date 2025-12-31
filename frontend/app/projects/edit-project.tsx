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
import { Project } from "@/lib/types";
import { mutate, useSWRConfig } from "swr";

export function EditProjectDialog({ project, setOpen, open }: { project: Project, setOpen: React.Dispatch<React.SetStateAction<boolean>>, open: boolean }) {
  const { mutate } = useSWRConfig();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const projectId = project.id;
    const projectName = formData.get("projectName") as string;
    const projectAlias = (formData.get("projectAlias") as string) || null;

    console.log("Submitting edit for project ID:", projectId);
    console.log("Submitting edit for project Name:", projectName);
    console.log("Submitting edit for project Alias:", projectAlias);
    // todo add validation

    // setLoading(true);
    // setOpen(false);
    try {
      await updateProject(projectId, null, projectName, projectAlias);
      //   setOpen(false);
      //   form.reset(); // clear the form
      //   router.refresh(); // refresh server-rendered data table
      await mutate(process.env.NEXT_PUBLIC_BACKEND_URI + "/projects");
    } catch (error) {
      console.error("Error adding project:", error);
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
              defaultValue={project.name}
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
              defaultValue={project.alias || ""}
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
