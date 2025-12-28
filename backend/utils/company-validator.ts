import { Context } from "@oak/oak/context";

// deno-lint-ignore no-explicit-any
export function parseJsonBody(ctx: Context): Promise<any> {
  const body = ctx.request.body;
  return body.json();
}

export function validateName(name: unknown): string | null {
  if (typeof name !== "string") return null;
  const trimmed = name.trim();
  if (trimmed.length > 0) {
    return trimmed;
  }
  return null;
}

export function validateIdParam(idParam?: string): number | null {
  if (!idParam) return null;
  const n = Number(idParam);
  return Number.isInteger(n) && n > 0 ? n : null;
}