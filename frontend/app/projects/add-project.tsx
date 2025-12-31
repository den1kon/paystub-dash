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
import { CompanySelect } from "./company-select";

import { PlusIcon } from "lucide-react";

import { postProject } from "@/lib/api/project";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useSWRConfig } from "swr";
import { Company } from "@/lib/types";

export function AddProjectButton() {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const [open, setOpen] = useState(false);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [companyId, setCompanyId] = useState<string>("");
  //   const [loading, setLoading] = useState(false);

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_BACKEND_URI + "/companies";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCompanies(data);
      })
      .catch((err) => {
        console.error("Failed to load companies:", err);
      });
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const projectName = formData.get("projectName") as string;
    const projectAlias = (formData.get("projectAlias") as string) || null;
    const companyIdValue =
      (formData.get("companyId") as string) || companyId || "";
    const companyIdNumber =
      companyIdValue !== "" ? Number(companyIdValue) : null;

    // todo add validation

    // setLoading(true);
    setOpen(false);
    try {
      await postProject(projectName, companyIdNumber, projectAlias);
      //   setOpen(false);
      //   form.reset(); // clear the form
      //   router.refresh(); // refresh server-rendered data table
      await mutate(process.env.NEXT_PUBLIC_BACKEND_URI + "/projects");
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
      <form id="add-project-form" onSubmit={handleSubmit}>
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
            <DialogTitle>Add new Project</DialogTitle>
            <DialogDescription>
              Enter the project details below and click submit.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="company">Company</Label>
              <CompanySelect
                companies={companies}
                value={companyId}
                onChange={(v) => setCompanyId(v)}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="projectName">Project Name</Label>
              <Input
                id="projectName"
                name="projectName"
                placeholder="e.g. HOBM's secret project"
                form="add-project-form"
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="projectAlias">(Optional) Project Alias</Label>
              <Input
                id="projectAlias"
                name="projectAlias"
                placeholder="Project Alias"
                form="add-project-form"
                required
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button" disabled={false}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" form="add-project-form" disabled={false}>
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
