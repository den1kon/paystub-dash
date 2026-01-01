"use client";

import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import React from "react";

export function TimePicker({
  label,
  id,
  value,
  onChange,
}: {
  label: string;
  id: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <Field className="flex flex-col gap-3">
      <FieldLabel htmlFor={id} className="text-md px-1 lg:text-xl">
        {label}
      </FieldLabel>
      <Input
        type="time"
        id={id}
        name={id}
        // step="1"
        value={value}
        onChange={onChange}
        className="text-muted-foreground appearance-none lg:text-xl [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
      />
    </Field>
  );
}
