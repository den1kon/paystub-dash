import { type RouterContext } from "@oak/oak/router";
import type { Context } from "@oak/oak/context";
import { parseJsonBody } from "../utils/company-validator.ts";
import { successResponse } from "../utils/response-helper.ts";
import { handleError } from "../utils/errors.ts";

import { type CompanyModel } from "../models/company-model.ts";
import * as CompanyService from "../services/company-service.ts";

/* Handler factories */
// easier to inject dependencies

export const makeGetAllCompaniesResponse = (companyModel: CompanyModel) => {
  return (ctx: Context) => {
      const companies = CompanyService.getAllCompanies(companyModel);
      ctx.response.status = 200;
      ctx.response.body = companies;
  };
};

export const makeCreateCompanyResponse = (companyModel: CompanyModel) => {
  return async (ctx: Context) => {
    try {
      const body = await parseJsonBody(ctx);
      CompanyService.createCompany(companyModel, body);
      successResponse(ctx, 201, "Company created successfully");
    } catch (err) {
      handleError(ctx, err);
    }
  };
};

export const makeUpdateCompanyNameResponse = (companyModel: CompanyModel) => {
  return async (ctx: RouterContext<string>) => {
    try {
      const idParam = ctx.params.id;
      const body = await parseJsonBody(ctx);
      CompanyService.updateCompanyName(companyModel, idParam, body.name, body.alias);
      successResponse(ctx, 200, "Company name updated successfully");
    } catch (err) {
      handleError(ctx, err);
    }
  };
};

export const makeDeleteCompanyResponse = (companyModel: CompanyModel) => {
  return (ctx: RouterContext<string>) => {
    try {
      const idParam = ctx.params.id;
      CompanyService.deleteCompany(companyModel, idParam);
      successResponse(ctx, 200, "Company deleted successfully");
    } catch (err) {
      handleError(ctx, err);
    }
  };
};
