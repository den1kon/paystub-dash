"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  onChange: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor={id} className="px-1">
        {label}
      </Label>
      <Input
        type="time"
        id={id}
        name={id}
        // step="1"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
      />
    </div>
  );
}
