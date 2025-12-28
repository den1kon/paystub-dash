import { Context } from "@oak/oak/context";
import { ValidationError } from "./errors.ts";

// deno-lint-ignore no-explicit-any
export function parseJsonBody(ctx: Context): Promise<any> {
  const body = ctx.request.body;
  return body.json();
}

export function parseAndValidateName(rawName?: string): string {
  if (typeof rawName !== "string") throw new ValidationError("Invalid name");
  
  const trimmed = rawName.trim();
  if (trimmed.length === 0 || trimmed.length > 100) throw new ValidationError("Invalid name length");
  
  return trimmed;
}

export function parseAndValidateIdParam(idParam?: string): number {
  if (!idParam) throw new ValidationError("Missing id parameter");
  const id = Number(idParam);
  if (!Number.isFinite(id) || id <= 0) throw new ValidationError("Invalid id parameter");
  return id;
}
