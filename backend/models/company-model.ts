import { Database } from "@db/sqlite";

export type CompanyEntity = {
  id: number;
  name: string;
  created_at: string;
  is_deleted: boolean;
};

export class CompanyModel {
  constructor(private db: Database) {}

  getAll(): CompanyEntity[] {
    const stmt = this.db.prepare(
      "SELECT id, name, created_at, is_deleted FROM companies",
    );
    const result: CompanyEntity[] = stmt.all();
    return result;
  }

  create(name: string): void {
    const stmt = this.db.prepare(
      "INSERT INTO companies (name) VALUES (?)",
    );
    stmt.run(name);
  }
}
