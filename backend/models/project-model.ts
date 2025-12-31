// deno-lint-ignore-file no-empty
import { Database, Statement } from "@db/sqlite";

export type ProjectEntity = {
  id: number;
  company_id: number | null;
  name: string;
  alias: string | null;
  created_at: string;
  is_deleted: boolean;
};

// SQLite (driver) is synchronous, so no need for async/await
// No plans to migrate to an async DB atm

export class ProjectModel {
  // cached sql statements
  private stmtGetAllWithDeleted: Statement<Record<string, unknown>>;
  private stmtGetAllWithoutDeleted: Statement<Record<string, unknown>>;
  private stmtGetById: Statement<Record<string, unknown>>;
  private stmtCreate: Statement<Record<string, unknown>>;
  private stmtUpdate: Statement<Record<string, unknown>>;
  private stmtSoftDelete: Statement<Record<string, unknown>>;

  private closed: boolean = false; // idempotent close guard

  constructor(private db: Database) {
    this.stmtGetAllWithDeleted = this.db.prepare(
      "SELECT id, company_id, name, alias, created_at, is_deleted FROM projects",
    );
    this.stmtGetAllWithoutDeleted = this.db.prepare(
      "SELECT id, company_id, name, alias, created_at, is_deleted FROM projects WHERE is_deleted = 0",
    );
    this.stmtGetById = this.db.prepare(
      "SELECT id, company_id, name, alias, created_at, is_deleted FROM projects WHERE id = ?",
    );
    this.stmtCreate = this.db.prepare(
      "INSERT INTO projects (company_id, name, alias) VALUES (?, ?, ?)",
    );
    this.stmtUpdate = this.db.prepare(
      "UPDATE projects SET company_id = ?, name = ?, alias = ? WHERE id = ?",
    );
    this.stmtSoftDelete = this.db.prepare(
      "UPDATE projects SET is_deleted = 1 WHERE id = ?",
    );
  }

  getAll(includeDeleted: boolean = false): ProjectEntity[] {
    const stmt = includeDeleted
      ? this.stmtGetAllWithDeleted
      : this.stmtGetAllWithoutDeleted;
    const result: ProjectEntity[] = stmt.all();
    return result;
  }

  getById(id: number): ProjectEntity | null {
    const result: ProjectEntity | undefined = this.stmtGetById.get(id);
    return result || null;
  }

  // returns id of created project
  create(company_id: number | null, name: string, alias: string | null): number {
    this.stmtCreate.run(company_id, name, alias);
    const id = this.db.lastInsertRowId as number;
    return id;
  }

  // return number of rows affected
  update(id: number, company_id: number | null, name: string, alias: string | null): number {
    // extra validation can not hurt
    if (!name || name.trim().length === 0) {
      throw new Error("Name cannot be empty");
    }

    this.stmtUpdate.run(company_id, name, alias, id);
    return this.db.changes;
  }

  // return number of rows affected
  softDelete(id: number): number {
    this.stmtSoftDelete.run(id);
    return this.db.changes;
  }

  close(): void {
    if (this.closed) return; // idempotent guard
    this.closed = true;
    
    // finalize statements
    try {
      this.stmtGetAllWithoutDeleted.finalize();
    } catch {}
    try {
      this.stmtGetAllWithDeleted.finalize();
    } catch {}
    try {
      this.stmtGetById.finalize();
    } catch {}
    try {
      this.stmtCreate.finalize();
    } catch {}
    try {
      this.stmtUpdate.finalize();
    } catch {}
    try {
      this.stmtSoftDelete.finalize();
    } catch {}
  }
}
