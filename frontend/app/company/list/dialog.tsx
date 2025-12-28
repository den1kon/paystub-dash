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

export function AddCompanyButton() {

const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const companyName = formData.get("company-name") as string;
    
    console.log(companyName);
  }

  return (
    <Dialog>
      <form id="add-company-form" onSubmit={handleSubmit}>
        <DialogTrigger asChild>
          <Button variant="default" size="icon-lg">
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
                name="company-name"
                placeholder="e.g. HOBM"
                form="add-company-form"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" form="add-company-form">Submit</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
