import { Context } from "@oak/oak/context";

export const logger = async (ctx: Context, next: () => Promise<unknown>) => {
  const start = Date.now();
  let timestamp = new Date().toISOString();
  console.log(`→ [REQUEST] ${timestamp}: HTTP Method ${ctx.request.method} at ${ctx.request.url}`);
  try {
    await next();
  } finally {
    timestamp = new Date().toISOString();
    const ms = Date.now() - start;
    console.log(`← [RESPONSE] ${timestamp}: HTTP Method ${ctx.request.method} at ${ctx.request.url} responded with status ${ctx.response.status} in ${ms}ms`);
  }
};