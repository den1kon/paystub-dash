import { Database } from "@db/sqlite";

export type CompanyEntity = {
  id: number;
  name: string;
  created_at: string;
  is_deleted: boolean;
};

// SQLite (driver) is synchronous, so no need for async/await
// No plans to migrate to an async DB atm

export class CompanyModel {
  constructor(private db: Database) {}

  getAll(includeDeleted: boolean = false): CompanyEntity[] {
    const sql = includeDeleted
      ? "SELECT id, name, created_at, is_deleted FROM companies"
      : "SELECT id, name, created_at, is_deleted FROM companies WHERE is_deleted = 0";
    const stmt = this.db.prepare(sql);
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

  // returns id of created company
  create(name: string): number {
    const stmt = this.db.prepare(
      "INSERT INTO companies (name) VALUES (?)",
    );
    stmt.run(name);
    const id = this.db.lastInsertRowId as number;
    return id;
  }

  // return number of rows affected
  updateName(id: number, name: string): number {
    // extra validation can not hurt
    if (!name || name.trim().length === 0) {
      throw new Error("Name cannot be empty");
    }

    const stmt = this.db.prepare(
      "UPDATE companies SET name = ? WHERE id = ?",
    );
    stmt.run(name, id);
    return this.db.changes;
  }

  // return number of rows affected
  softDelete(id: number): number {
    const stmt = this.db.prepare(
      "UPDATE companies SET is_deleted = 1 WHERE id = ?",
    );
    stmt.run(id);
    return this.db.changes;
  }
}
