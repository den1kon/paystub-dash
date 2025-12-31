import { type RouterContext } from "@oak/oak/router";
import type { Context } from "@oak/oak/context";
import { parseJsonBody } from "../utils/company-validator.ts";
import { successResponse, errorResponse } from "../utils/response-helper.ts";
import { CustomError } from "../utils/errors.ts";

import { type ProjectModel } from "../models/project-model.ts";
import * as ProjectService from "../services/project-service.ts";


const handleError = (ctx: Context, err: unknown) => {
  if (err instanceof CustomError) {
    console.log("Service error:", err);
    errorResponse(ctx, err.status, err.message);
    return;
  }
  throw err;
}


/* Handler factories */
// easier to inject dependencies

export const makeGetAllProjectsResponse = (projectModel: ProjectModel) => {
  return (ctx: Context) => {
      const projects = ProjectService.getAllProjects(projectModel);
      ctx.response.status = 200;
      ctx.response.body = projects;
  };
};

export const makeCreateProjectResponse = (projectModel: ProjectModel) => {
  return async (ctx: Context) => {
    try {
      const body = await parseJsonBody(ctx);
      ProjectService.createProject(projectModel, body);
      successResponse(ctx, 201, "Project created successfully");
    } catch (err) {
      handleError(ctx, err);
    }
  };
};

export const makeUpdateProjectNameResponse = (projectModel: ProjectModel) => {
  return async (ctx: RouterContext<string>) => {
    try {
      const idParam = ctx.params.id;
      const body = await parseJsonBody(ctx);
      ProjectService.updateProjectName(projectModel, idParam, body.name, body.alias);
      successResponse(ctx, 200, "Project name updated successfully");
    } catch (err) {
      handleError(ctx, err);
    }
  };
};

export const makeDeleteProjectResponse = (projectModel: ProjectModel) => {
  return (ctx: RouterContext<string>) => {
    try {
      const idParam = ctx.params.id;
      ProjectService.deleteProject(projectModel, idParam);
      successResponse(ctx, 200, "Project deleted successfully");
    } catch (err) {
      handleError(ctx, err);
    }
  };
};
