import { type RouterContext } from "@oak/oak/router";
import type { Context } from "@oak/oak/context";
import { toDTO } from "../mappers/company.ts";


import { type CompanyEntity, CompanyModel } from "../models/company-model.ts";

const badRequest = (ctx: Context, msg = "Bad request") => {
  ctx.response.status = 400;
  ctx.response.body = { error: msg };
};

/* Handler factories */

export const makeGetAllCompaniesResponse = (companyModel: CompanyModel) => {
  return (ctx: Context) => {
    try {
      const entities = companyModel.getAll();
      const dtos = entities.map(toDTO);
      ctx.response.status = 200;
      ctx.response.body = { data: dtos };
    } catch (err) {
      console.log("getAllCompanies error:", err);
      ctx.response.status = 500;
      ctx.response.body = { error: "Internal server error" };
    }
  };
};

export const makeCreateCompanyResponse = (companyModel: CompanyModel) => {
  return async (ctx: Context) => {
    try {
      const body = await ctx.request.body.json();
      const rawName = body?.name;
      const name = typeof rawName === "string" ? rawName.trim() : null;

      if (!name) {
        badRequest(ctx, "Invalid company name");
        return;
      }

      companyModel.create(name);
      ctx.response.status = 201;
      ctx.response.body = { message: "Company created successfully" };
    } catch (err) {
      console.log("createCompany error:", err);
      ctx.response.status = 500;
      ctx.response.body = { error: "Internal server error" };
    }
  };
};

export const makeUpdateCompanyNameResponse = (companyModel: CompanyModel) => {
  return async (ctx: Context) => {
    try {
      const body = await ctx.request.body.json();
      const idRaw = body?.id;
      const nameRaw = body?.name;
      const id = Number(idRaw);
      const name = typeof nameRaw === "string" ? nameRaw.trim() : null;

      if (!Number.isInteger(id) || id <= 0) {
        badRequest(ctx, "Invalid company id");
        return;
      }
      if (!name) {
        badRequest(ctx, "Invalid company name");
        return;
      }

      const entity: CompanyEntity = {
        id,
        name,
        created_at: "", // Placeholder, not used for update
        is_deleted: false, // Placeholder, not used for update
      };

      companyModel.updateName(entity);
      ctx.response.status = 200;
      ctx.response.body = { message: "Company name updated successfully" };
    } catch (err) {
      console.log("updateCompanyName error:", err);
      ctx.response.status = 500;
      ctx.response.body = { error: "Internal server error" };
    }
  };
};

export const makeDeleteCompanyResponse = (companyModel: CompanyModel) => {
  return (ctx: RouterContext<string>) => {
    try {
      const idParam = ctx.params.id;

      if (!idParam) {
        badRequest(ctx, "Missing company id parameter");
        return;
      }

      const id = Number(idParam);

      if (!Number.isInteger(id) || id <= 0) {
        badRequest(ctx, "Invalid company id");
        return;
      }
      
      companyModel.softDelete(id);
      ctx.response.status = 200;
      ctx.response.body = { message: "Company deleted successfully" };
    } catch (err) {
      console.log("deleteCompany error:", err);
      ctx.response.status = 500;
      ctx.response.body = { error: "Internal server error" };
    }
  };
};
