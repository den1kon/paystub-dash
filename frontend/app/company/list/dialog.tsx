"use client";

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

export function AddCompanyButton() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const companyName = formData.get("company-name") as string;
    // todo add validation

    setLoading(true);
    try {
      setOpen(false); // close dialog
      await postCompany(companyName);
      form.reset(); // clear the form
      router.refresh(); // refresh server-rendered data table
    } catch (error) {
      console.error("Error adding company:", error);
      alert("Unexpected error. Report to admin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form id="add-company-form" onSubmit={handleSubmit}>
        <DialogTrigger asChild>
          <Button variant="default" size="icon-lg" type="button" disabled={loading}>
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
              <Button variant="outline" type="button" disabled={loading}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" form="add-company-form" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
