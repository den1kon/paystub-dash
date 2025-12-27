import { Application } from "jsr:@oak/oak/application";
import { Router } from "jsr:@oak/oak/router";
import { CompanyModel } from "./models/company-model.ts";
import { makeGetAllCompaniesResponse } from "./controllers/company-controller.ts";
import { Database } from "@db/sqlite";

export function createApp(conn: Database): Application {
  const companyModel = new CompanyModel(conn);
  const router = new Router();

  router.get("/health", (ctx) => {
    ctx.response.status = 200;
    ctx.response.body = { status: "ok" };
  });

  router.get("/api/v0/companies", makeGetAllCompaniesResponse(companyModel));

  const app = new Application();
  app.use(router.routes());
  app.use(router.allowedMethods());

  return app;
}
