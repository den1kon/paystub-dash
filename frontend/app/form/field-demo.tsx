"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ProjectNativeSelect } from "./form/project-native-select";
import { QualificationNativeSelect } from "./form/qualification-select";
import { DatePicker } from "./form/date-picker";
import { TimePicker } from "./form/time-picker";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

type Project = {
  id: number;
  name: string;
}

type Qualification = "Homeoffice" | "Bauleitung";

type WorkEntryPostData = {
  projectId: Project['id'];
  qualification: Qualification;
  description: string;
  startTime: string; // hh-mm
  endTime: string; // hh-mm
  entryDate: string; // yyyy-mm-dd
}

export function FieldDemo() {
  const [project, setProject] = useState<Project>();
  const [qualification, setQualification] = useState<Qualification>('Homeoffice');
  const [description, setDescription] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("10:00");
  const [endTime, setEndTime] = useState<string>("18:00");
  const [entryDate, setEntryDate] = useState<Date>(new Date());

  return (
    <div className="border-muted-foreground w-full max-w-3xl rounded-2xl border p-6">
      <form>
        <FieldGroup>
          <FieldSet>
            <FieldLegend className="font-bold lg:text-4xl!">
              Add new work entry
            </FieldLegend>
            <FieldDescription>[description goes here]</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-3">
                <DatePicker value={entryDate} onChange={setEntryDate} />
                <TimePicker
                  label="Start Time"
                  id="startTime"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
                <TimePicker
                  label="End Time"
                  id="endTime"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </div>
            </FieldGroup>
          </FieldSet>
          <FieldSet>
            <FieldGroup>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <ProjectNativeSelect />
                <QualificationNativeSelect />
              </div>
            </FieldGroup>
          </FieldSet>
          <FieldSeparator />
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel
                  htmlFor="checkout-7j9-optional-comments"
                  className="lg:text-xl"
                >
                  Description
                </FieldLabel>
                <Textarea
                  id="checkout-7j9-optional-comments"
                  placeholder="Add any additional comments"
                  className="text-muted-foreground resize-y lg:text-lg"
                />
              </Field>
            </FieldGroup>
          </FieldSet>
          <Field className="flex justify-center" orientation="horizontal">
            {/* <Button
              variant="outline"
              type="button"
              className="p-5 text-lg lg:text-xl"
            >
              Cancel
            </Button> */}
            <Button type="submit" className="p-5 text-lg lg:text-xl">
              Submit
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
