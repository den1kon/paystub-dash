import Db from "./db/database.ts";
import { createApp } from "./app.ts";


const dbInstance = new Db("./data/db.sqlite");
dbInstance.init();

const conn = dbInstance.getConnection();

Db.seedCompanies(conn);
Db.seedProjects(conn);
Db.seedWorkEntries(conn);

const { app, shutdown } = createApp(conn);

console.log("Starting server on http://localhost:8080");

// graceful signal handling (Deno)
Deno.addSignalListener("SIGINT", () => {
  console.log("SIGINT received — shutting down");
  shutdown();
  dbInstance.close();
  Deno.exit();
});
Deno.addSignalListener("SIGTERM", () => {
  console.log("SIGTERM received — shutting down");
  shutdown();
  dbInstance.close();
  Deno.exit();
});

await app.listen({ port: 8080 });

dbInstance.close();