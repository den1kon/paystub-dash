import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";

import { Field, FieldLabel } from "@/components/ui/field";

const DATA = [
    { id: 1, name: "Acme Group" },
    { id: 2, name: "Square" },
    { id: 3, name: "Engel" },
    { id: 4, name: "Test" },
    { id: 5, name: "Google" },
]

export function ProjectNativeSelect() {
  return (
    <Field className="flex flex-col gap-3">
      <FieldLabel className="text-md lg:text-xl" htmlFor="project-select">Projekt</FieldLabel>
      <NativeSelect className="text-muted-foreground lg:text-xl!" id="project-select" name="project">
        { DATA.map((project) => (
          <NativeSelectOption className="lg:text-xl!" key={project.id} value={project.name}>
            {project.name}
          </NativeSelectOption>
        )) }
      </NativeSelect>
    </Field>
  );
}