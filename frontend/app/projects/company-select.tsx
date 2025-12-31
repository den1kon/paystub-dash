'use client'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Company = { id: number; name: string }

export function CompanySelect({
  companies,
  value,
  onChange,
  name = "companyId",
}: {
  companies: Company[]
  value: string | null
  onChange: (v: string) => void
  name?: string
}) {
  return (
    <div>
      <Select value={value ?? undefined} onValueChange={(v) => onChange(v)}>
        <SelectTrigger className="w-auto text-[16px] font-medium p-3">
          <SelectValue className="text-[16px] p-0" placeholder="Select a company" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {companies.map((company) => (
              <SelectItem className="p-2 text-[16px]" key={company.id} value={company.id.toString()}>
                <SelectLabel className="text-[16px] p-0">{company.name}</SelectLabel>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <input type="hidden" name={name} value={value ?? ""} />
    </div>
  )
}