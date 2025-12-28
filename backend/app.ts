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
import { errorHandler } from "./middleware/error-handler.ts";

export function createApp(conn: Database): {app: Application, shutdown: () => void} {
  const companyModel = new CompanyModel(conn);
  const router = new Router();

  router.get("/health", (ctx) => {
    ctx.response.status = 200;
    ctx.response.body = { status: "ok" };
  });

  router.get("/api/v0/companies", makeGetAllCompaniesResponse(companyModel));
  router.post("/api/v0/companies", makeCreateCompanyResponse(companyModel));
  router.put(
    "/api/v0/companies/:id",
    makeUpdateCompanyNameResponse(companyModel),
  );
  router.delete(
    "/api/v0/companies/:id",
    makeDeleteCompanyResponse(companyModel),
  );

  const app = new Application();

  // Middleware
  app.use(logger);
  app.use(errorHandler);

  app.use(router.routes());
  app.use(router.allowedMethods());

  const shutdown = () => {
    console.log("Shutting down application...");
    try {
      companyModel.close();
      console.log("Application shutdown complete.");
    } catch (err) {
      console.error("Error during application shutdown:", err);
    }
  };

  app.addEventListener("close", () => {
    shutdown();
  });

  return {app, shutdown};
}
