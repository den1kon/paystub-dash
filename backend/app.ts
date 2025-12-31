import { Application } from "jsr:@oak/oak/application";
import { Router } from "jsr:@oak/oak/router";
import { CompanyModel } from "./models/company-model.ts";
import { ProjectModel } from "./models/project-model.ts";
import {
  makeCreateCompanyResponse,
  makeDeleteCompanyResponse,
  makeGetAllCompaniesResponse,
  makeUpdateCompanyNameResponse,
} from "./controllers/company-controller.ts";
import {
  makeCreateProjectResponse,
  makeDeleteProjectResponse,
  makeGetAllProjectsResponse,
  makeUpdateProjectNameResponse,
} from "./controllers/project-controller.ts";
import { Database } from "@db/sqlite";
import { logger } from "./middleware/logger.ts";
import { errorHandler } from "./middleware/error-handler.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";

export function createApp(
  conn: Database,
): { app: Application; shutdown: () => void } {
  const companyModel = new CompanyModel(conn);
  const projectModel = new ProjectModel(conn);
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
  router.get("/api/v0/projects", makeGetAllProjectsResponse(projectModel));
  router.post("/api/v0/projects", makeCreateProjectResponse(projectModel));
  router.put(
    "/api/v0/projects/:id",
    makeUpdateProjectNameResponse(projectModel),
  );
  router.delete(
    "/api/v0/projects/:id",
    makeDeleteProjectResponse(projectModel),
  );

  const app = new Application();

  // Middleware
  app.use(oakCors({ origin: "*" }));
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

  return { app, shutdown };
}
