import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProjectSelect } from "./project-select";

import { PlusIcon } from "lucide-react";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useSWRConfig } from "swr";
import { Project } from "@/lib/types";
import { postWorkEntry } from "@/lib/api/work-entry";
import { DatePicker } from "./date-picker";
import { TimePicker } from "./time-picker";
import { SelectQualification } from "./select-qualification";
import { Description } from "./description";

function parseDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`; // yyyy-mm-dd format
}

export function AddWorkEntryButton() {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const [open, setOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectId, setProjectId] = useState<string>("");
  const [qualification, setQualification] = useState<string>("Homeoffice");
  const [description, setDescription] = useState<string | null>(null);
  const [date, setDate] = useState<Date>(new Date());
  const [startTime, setStartTime] = useState<string>("10:00");
  const [endTime, setEndTime] = useState<string>("16:00");
  //   const [loading, setLoading] = useState(false);

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_BACKEND_URI + "/projects";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
      })
      .catch((err) => {
        console.error("Failed to load projects:", err);
      });
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const projectName = formData.get("projectName") as string;
    const projectAlias = (formData.get("projectAlias") as string) || null;
    const projectIdValue =
      (formData.get("projectId") as string) || projectId || "";
    const projectIdNumber =
      projectIdValue !== "" ? Number(projectIdValue) : null;
    const workDateValue = parseDate(date);
    const startTimeValue = startTime;
    const endTimeValue = endTime;

    const newWorkEntry = {
      projectIdNumber,
      workDateValue,
      startTimeValue,
      endTimeValue,
      qualification,
      description,
    };

    console.log(newWorkEntry);

    // todo add validation

    // setLoading(true);
    setOpen(false);
    try {
      await postWorkEntry(
        projectIdNumber,
        workDateValue,
        startTimeValue,
        endTimeValue,
        qualification,
        description,
      );
      //   setOpen(false);
      //   form.reset(); // clear the form
      //   router.refresh(); // refresh server-rendered data table
      await mutate(process.env.NEXT_PUBLIC_BACKEND_URI + "/work-entries");
    } catch (error) {
      console.error("Error adding company:", error);
      alert("Unexpected error. Report to admin.");
    } finally {
      //   form.reset();
      //   setOpen(false);
      //   setLoading(false);
      //   router.refresh();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form id="add-work-entry-form" onSubmit={handleSubmit}>
        <DialogTrigger asChild>
          <Button
            variant="default"
            size="icon-lg"
            type="button"
            disabled={false}
          >
            <PlusIcon />
          </Button>
        </DialogTrigger>

        <DialogContent
          className="sm:max-w-106.25"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>Add new Work Entry</DialogTitle>
            <DialogDescription>
              Enter the work entry details below and click submit.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="flex justify-left gap-3">
              <div className="grid gap-3">
                <Label htmlFor="project">Project</Label>
                <ProjectSelect
                  projects={projects}
                  value={projectId}
                  onChange={(v) => setProjectId(v)}
                />
              </div>
              <div className="grid gap-3">
                <DatePicker value={date} onChange={setDate} />
              </div>
            </div>
            <div className="flex justify-left gap-3">
              <TimePicker
                label="Start Time"
                id="startTime"
                value={startTime}
                onChange={setStartTime}
              />
              <TimePicker
                label="End Time"
                id="endTime"
                value={endTime}
                onChange={setEndTime}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="qualification">Qualification</Label>
              <SelectQualification
                value={qualification}
                onChange={setQualification}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Description value={description} onChange={setDescription} />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button" disabled={false}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" form="add-work-entry-form" disabled={false}>
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
