import type { Context } from "@oak/oak/context";

export const errorHandler = async (
  ctx: Context,
  next: () => Promise<unknown>,
) => {
  try {
    await next();
  } catch (err: unknown) {
    let status = 500;
    let message = "Internal server error";
    let code = "InternalServerError";

    if (err instanceof Error) {
      message = err.message || message;
      code = err.name || code;
    }

    if (typeof err === "object" && err !== null) {
      const maybe = err as { status?: number; statusCode?: number };
      if (typeof maybe.status === "number") status = maybe.status;
      else if (typeof maybe.statusCode === "number") status = maybe.statusCode;
    }

    ctx.response.status = status;
    ctx.response.type = "application/json";
    ctx.response.body = {
      error: message,
      code,
    };

    // useful for debugging
    console.error(err);
  }
};
