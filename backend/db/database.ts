import { Database } from "@db/sqlite";
import { Migration, migrations } from "./migrations.ts";
import { seedCompanies } from "./seed-companies.ts";
import { seedProjects } from "./seed-projects.ts";
import { CompanyModel } from "../models/company-model.ts";
import { ProjectModel } from "../models/project-model.ts";
import { seedWorkEntries } from "./seed-work-entries.tsx";
import { WorkEntryModel } from "../models/work-entry-model.ts";

export default class Db {
  private connection: Database;

  constructor(private dbPath: string) {
    this.connection = new Database(dbPath);
  }

  init(): void {
    console.log("Initializing database...");

    this.setupMigrationsTable();

    const appliedMigrations = this.getAppliedMigrations();
    const pendingMigrations = migrations.filter(
      (migration) => !appliedMigrations.has(migration.name),
    );

    for (const migration of pendingMigrations) {
      console.log(`Applying migration: ${migration.name}`);
      this.applyMigration(migration);
    }

    console.log("Database initialized");
  }

  getConnection(): Database {
    return this.connection;
  }

  close(): void {
    this.connection.close();
    console.log("Database connection closed");
  }

  // Sets up the migrations table if it doesn't exist
  private setupMigrationsTable(): void {
    this.connection.exec(`
      CREATE TABLE IF NOT EXISTS migrations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        applied_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }

  private getAppliedMigrations(): Set<string> {
    const stmt = this.connection.prepare("SELECT name FROM migrations");
    const rows = stmt.all() as { name: string }[];
    stmt.finalize();
    return new Set(rows.map((row) => row.name));
  }

  private applyMigration(migration: Migration): void {
    this.connection.transaction(() => {
      this.connection.exec(migration.sql);
      this.connection.run(
        "INSERT INTO migrations (name) VALUES (?)",
        [migration.name],
      );
    })();
  }

  static seedCompanies(conn: Database): void {
    const companyModel = new CompanyModel(conn);
    seedCompanies(companyModel);
  }

  static seedProjects(conn: Database): void {
    const projectModel = new ProjectModel(conn);
    seedProjects(projectModel);
  }

  static seedWorkEntries(conn: Database): void {
    const workEntryModel = new WorkEntryModel(conn);
    seedWorkEntries(workEntryModel);
  }
}
