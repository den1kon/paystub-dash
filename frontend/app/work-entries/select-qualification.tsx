"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectQualification({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <Select value={value ?? undefined} onValueChange={(v) => onChange(v)}>
        <SelectTrigger className="w-auto p-3 text-sm">
          <SelectValue className="p-0 text-sm" placeholder="Select a company" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem
              className="p-2 text-sm"
              key="homeoffice"
              value="Homeoffice"
            >
              <SelectLabel className="p-0 text-sm">Homeoffice</SelectLabel>
            </SelectItem>
            <SelectItem
              className="p-2 text-sm"
              key="bauleitung"
              value="Bauleitung"
            >
              <SelectLabel className="p-0 text-sm">Bauleitung</SelectLabel>
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <input type="hidden" name="qualification" value={value ?? ""} />
    </div>
  );
}
