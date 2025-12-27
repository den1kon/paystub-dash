import Db from "./db/database.ts";
import { CompanyModel, CompanyEntity } from "./models/company-model.ts";
import { toDTO } from "./controllers/company-controller.ts";
import { createApp } from "./app.ts";


const dbInstance = new Db("./data/db.sqlite");
dbInstance.init();

const conn = dbInstance.getConnection();

const companyModel = new CompanyModel(conn);

companyModel.create("Test Company");

const companiesModel: CompanyEntity[] = companyModel.getAll();
console.log("Raw Companies:", companiesModel);

const companiesDTO = companiesModel.map(toDTO);
console.log("Company DTOs:", companiesDTO);


const app = createApp(conn);

console.log("Starting server on http://localhost:8080");

await app.listen({ port: 8080 });

dbInstance.close();