import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";

import { Field, FieldLabel } from "@/components/ui/field";

const DATA = [
    "Homeoffice",
    "Bauleitung",
]

export function QualificationNativeSelect() {
  return (
    <Field className="flex flex-col gap-3">
      <FieldLabel className="text-md lg:text-xl" htmlFor="project-select">Qualification</FieldLabel>
      <NativeSelect className="text-muted-foreground lg:text-xl!" id="project-select" name="project">
        { DATA.map((project) => (
          <NativeSelectOption className="lg:text-xl!" key={project}>
            {project}
          </NativeSelectOption>
        )) }
      </NativeSelect>
    </Field>
  );
}