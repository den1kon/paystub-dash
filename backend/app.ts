import { Application } from "jsr:@oak/oak/application";
import { Router } from "jsr:@oak/oak/router";
import { CompanyModel } from "./models/company-model.ts";
import {
  makeCreateCompanyResponse,
  makeDeleteCompanyResponse,
  makeGetAllCompaniesResponse,
  makeUpdateCompanyNameResponse,
} from "./controllers/company-controller.ts";
import { Database } from "@db/sqlite";
import { logger } from "./middleware/logger.ts";

export function createApp(conn: Database): Application {
  const companyModel = new CompanyModel(conn);
  const router = new Router();

  router.get("/health", (ctx) => {
    ctx.response.status = 200;
    ctx.response.body = { status: "ok" };
  });

  router.get("/api/v0/companies", makeGetAllCompaniesResponse(companyModel));
  router.post("/api/v0/companies", makeCreateCompanyResponse(companyModel));
  router.put("/api/v0/companies", makeUpdateCompanyNameResponse(companyModel));
  router.delete(
    "/api/v0/companies/:id",
    makeDeleteCompanyResponse(companyModel),
  );

  router.delete('users/:userId', (ctx) => {
    const userId = ctx.params.userId;
    console.log(`User ID from URL: ${userId}`);
  })

  const app = new Application();

  app.use(logger);

  app.use(router.routes());
  app.use(router.allowedMethods());

  return app;
}
