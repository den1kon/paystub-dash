import { type RouterContext } from "@oak/oak/router";
import type { Context } from "@oak/oak/context";
import { parseJsonBody } from "../utils/company-validator.ts";
import { successResponse } from "../utils/response-helper.ts";
import { handleError } from "../utils/errors.ts";

import { type WorkEntryModel } from "../models/work-entry-model.ts";
import * as WorkEntryService from "../services/work-entry-service.ts";

/* Handler factories */
// easier to inject dependencies
    
export const makeGetAllWorkEntriesResponse = (workEntryModel: WorkEntryModel) => {
  return (ctx: Context) => {
      const workEntries = WorkEntryService.getAllWorkEntries(workEntryModel);
      ctx.response.status = 200;
      ctx.response.body = workEntries;
  };
};

export const makeCreateWorkEntryResponse = (workEntryModel: WorkEntryModel) => {
  return async (ctx: Context) => {
    try {
      const body = await parseJsonBody(ctx);
      WorkEntryService.createWorkEntry(workEntryModel, body);
      successResponse(ctx, 201, "Work entry created successfully");
    } catch (err) {
      handleError(ctx, err);
    }
  };
};

export const makeUpdateWorkEntryResponse = (workEntryModel: WorkEntryModel) => {
  return async (ctx: RouterContext<string>) => {
    try {
      const idParam = ctx.params.id;
      const body = await parseJsonBody(ctx);
      WorkEntryService.updateWorkEntry(workEntryModel, idParam, body.projectId, body.workDate, body.startTime, body.endTime, body.qualification, body.description);
      successResponse(ctx, 200, "Work entry updated successfully");
    } catch (err) {
      handleError(ctx, err);
    }
  };
};

export const makeDeleteWorkEntryResponse = (workEntryModel: WorkEntryModel) => {
  return (ctx: RouterContext<string>) => {
    try {
      const idParam = ctx.params.id;
      WorkEntryService.deleteWorkEntry(workEntryModel, idParam);
      successResponse(ctx, 200, "Work entry deleted successfully");
    } catch (err) {
      handleError(ctx, err);
    }
  };
};
