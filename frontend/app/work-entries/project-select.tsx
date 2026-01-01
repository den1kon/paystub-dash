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

type Project = { id: number; name: string }

export function ProjectSelect({
  projects,
  value,
  onChange,
  name = "projectId",
}: {
  projects: Project[]
  value: string | null
  onChange: (v: string) => void
  name?: string
}) {
  return (
    <div>
      <Select value={value ?? undefined} onValueChange={(v) => onChange(v)}>
        <SelectTrigger className="w-auto text-sm p-3">
          <SelectValue className="text-sm p-0" placeholder="Select a project" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {projects.map((project) => (
              <SelectItem className="p-2 text-sm" key={project.id} value={project.id.toString()}>
                <SelectLabel className="text-sm p-0">{project.name}</SelectLabel>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <input type="hidden" name={name} value={value ?? ""} />
    </div>
  )
}