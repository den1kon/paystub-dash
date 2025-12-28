import { type RouterContext } from "@oak/oak/router";
import type { Context } from "@oak/oak/context";
import { toDTO } from "../mappers/company.ts";
import { parseJsonBody, validateName, validateIdParam } from "../validators/company-validator.ts";
import { successResponse, errorResponse } from "../utils/response-helper.ts";


import { type CompanyEntity, CompanyModel } from "../models/company-model.ts";

/* Handler factories */
// easier to inject dependencies

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
      const body = await parseJsonBody(ctx);
      const name = validateName(body?.name);

      if (!name) {
        errorResponse(ctx, 400, "Invalid company name");
        return;
      }

      companyModel.create(name);
      successResponse(ctx, 201, "Company created successfully");
    } catch (err) {
      console.log("createCompany error:", err);
      errorResponse(ctx, 500, "Internal server error");
    }
  };
};

export const makeUpdateCompanyNameResponse = (companyModel: CompanyModel) => {
  return async (ctx: Context) => {
    try {
      const body = await parseJsonBody(ctx);
      const id = validateIdParam(body?.id);
      const name = validateName(body?.name);

      if (!id || !name || id <= 0) {
        errorResponse(ctx, 400, "Invalid company id or name"); // less description for security haha
        return;
      }

      const entity: CompanyEntity = {
        id,
        name,
        created_at: "", // Placeholder, not used for update
        is_deleted: false, // Placeholder, not used for update
      };

      companyModel.updateName(entity);
      successResponse(ctx, 200, "Company name updated successfully");
    } catch (err) {
      console.log("updateCompanyName error:", err);
      errorResponse(ctx, 500, "Internal server error");
    }
  };
};

export const makeDeleteCompanyResponse = (companyModel: CompanyModel) => {
  return (ctx: RouterContext<string>) => {
    try {
      const idParam = ctx.params.id;

      if (!idParam) {
        errorResponse(ctx, 400, "Missing company id parameter");
        return;
      }

      const id = Number(idParam);

      if (!Number.isInteger(id) || id <= 0) {
        errorResponse(ctx, 400, "Invalid company id");
        return;
      }
      
      companyModel.softDelete(id);
      successResponse(ctx, 200, "Company deleted successfully");
    } catch (err) {
      console.log("deleteCompany error:", err);
      errorResponse(ctx, 500, "Internal server error");
    }
  };
};
