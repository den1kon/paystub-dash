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

import { updateCompany } from "@/lib/api/company";
import { Company } from "@/lib/types";
import { mutate, useSWRConfig } from "swr";

export function EditCompanyDialog({ company, setOpen, open }: { company: Company, setOpen: React.Dispatch<React.SetStateAction<boolean>>, open: boolean }) {
  const { mutate } = useSWRConfig();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const companyId = company.id;
    const companyName = formData.get("companyName") as string;
    const companyAlias = (formData.get("companyAlias") as string) || null;

    console.log("Submitting edit for company ID:", companyId);
    console.log("Submitting edit for company Name:", companyName);
    console.log("Submitting edit for company Alias:", companyAlias);
    // todo add validation

    // setLoading(true);
    // setOpen(false);
    try {
      await updateCompany(companyId, companyName, companyAlias);
      //   setOpen(false);
      //   form.reset(); // clear the form
      //   router.refresh(); // refresh server-rendered data table
      await mutate(process.env.NEXT_PUBLIC_BACKEND_URI + "/companies");
    } catch (error) {
      console.error("Error adding company:", error);
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
      <form id="edit-company-form" onSubmit={handleSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              name="companyName"
              placeholder="e.g. HOBM"
              form="edit-company-form"
              defaultValue={company.name}
              autoFocus={false}
              required
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="companyAlias">(Optional) Company Alias</Label>
            <Input
              id="companyAlias"
              name="companyAlias"
              placeholder="Company Alias"
              form="edit-company-form"
              defaultValue={company.alias || ""}
            />
          </div>
        </div>

        <DialogFooter className="pt-6">
          <DialogClose asChild>
            <Button variant="outline" type="button" disabled={false}>
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" form="edit-company-form" disabled={false}>
            Save
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
