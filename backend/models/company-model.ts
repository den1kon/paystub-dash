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

  getById(id: number): CompanyEntity | null {
    const stmt = this.db.prepare(
      "SELECT id, name, created_at, is_deleted FROM companies WHERE id = ?",
    );
    const result: CompanyEntity | undefined = stmt.get(id);
    return result || null;
  }

  create(name: string): void {
    const stmt = this.db.prepare(
      "INSERT INTO companies (name) VALUES (?)",
    );
    stmt.run(name);
  }

  updateName(entity: CompanyEntity): void {
    const stmt = this.db.prepare(
      "UPDATE companies SET name = ? WHERE id = ?",
    );
    stmt.run(entity.name, entity.id);
  }

  softDelete(id: number): void {
    const stmt = this.db.prepare(
      "UPDATE companies SET is_deleted = 1 WHERE id = ?",
    );
    stmt.run(id);
  }
}
