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

import { PlusIcon } from "lucide-react";

import { postCompany } from "@/lib/api";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Company } from "@/lib/types";
import { useSWRConfig } from "swr";

export function AddCompanyButton() {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const [open, setOpen] = useState(false);
  //   const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const companyName = formData.get("companyName") as string;
    const companyAlias = (formData.get("companyAlias") as string) || null;

    // todo add validation

    // setLoading(true);
    setOpen(false);
    try {
      await postCompany(companyName, companyAlias);
      //   setOpen(false);
      //   form.reset(); // clear the form
      //   router.refresh(); // refresh server-rendered data table
      await mutate("http://localhost:8080/api/v0/companies");
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
      <form id="add-company-form" onSubmit={handleSubmit}>
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

        <DialogContent className="sm:max-w-106.25">
          <DialogHeader>
            <DialogTitle>Add new Company</DialogTitle>
            <DialogDescription>
              Enter the company details below and click submit.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                name="companyName"
                placeholder="e.g. HOBM"
                form="add-company-form"
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="companyAlias">(Optional) Company Alias</Label>
              <Input
                id="companyAlias"
                name="companyAlias"
                placeholder="Company Alias"
                form="add-company-form"
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
            <Button type="submit" form="add-company-form" disabled={false}>
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
