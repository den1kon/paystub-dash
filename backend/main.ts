import Db from "./db/database.ts";
import { createApp } from "./app.ts";


const dbInstance = new Db("./data/db.sqlite");
dbInstance.init();

const conn = dbInstance.getConnection();

// Db.seedCompanies(conn);

const app = createApp(conn);

console.log("Starting server on http://localhost:8080");

await app.listen({ port: 8080 });

dbInstance.close();