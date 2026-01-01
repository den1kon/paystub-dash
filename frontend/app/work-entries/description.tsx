import { Textarea } from "@/components/ui/textarea";
import React from "react";

export function Description({ value, onChange } : {value: string | null, onChange: React.Dispatch<React.SetStateAction<string | null>>} ) {
  return <Textarea value={value || ""} onChange={(e) => onChange(e.target.value)} placeholder="Type your description here." />;
}
