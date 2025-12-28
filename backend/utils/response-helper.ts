import { Context } from "@oak/oak/context";

const successResponse = (ctx: Context, status: number, msg: string) => {
  ctx.response.status = status;
  ctx.response.body = { message: msg };
}

const errorResponse = (ctx: Context, status: number, msg: string) => {
  ctx.response.status = status;
  ctx.response.body = { error: msg };
}

export { successResponse, errorResponse };