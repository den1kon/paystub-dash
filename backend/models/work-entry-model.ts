// deno-lint-ignore-file no-empty
import { Database, Statement } from "@db/sqlite";

export type WorkEntryEntity = {
  id: number;
  project_id: number | null;
  work_date: string;
  start_time: string;
  end_time: string;
  qualification: string;
  description: string | null;
  created_at: string;
  is_deleted: boolean;
};

// SQLite (driver) is synchronous, so no need for async/await
// No plans to migrate to an async DB atm

export class WorkEntryModel {
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
      "SELECT id, project_id, work_date, start_time, end_time, qualification, description, created_at, is_deleted FROM work_entries",
    );
    this.stmtGetAllWithoutDeleted = this.db.prepare(
      "SELECT id, project_id, work_date, start_time, end_time, qualification, description, created_at, is_deleted FROM work_entries WHERE is_deleted = 0",
    );
    this.stmtGetById = this.db.prepare(
      "SELECT id, project_id, work_date, start_time, end_time, qualification, description, created_at, is_deleted FROM work_entries WHERE id = ?",
    );
    this.stmtCreate = this.db.prepare(
      "INSERT INTO work_entries (project_id, work_date, start_time, end_time, qualification, description) VALUES (?, ?, ?, ?, ?, ?)",
    );
    this.stmtUpdate = this.db.prepare(
      "UPDATE work_entries SET project_id = ?, work_date = ?, start_time = ?, end_time = ?, qualification = ?, description = ? WHERE id = ?",
    );
    this.stmtSoftDelete = this.db.prepare(
      "UPDATE work_entries SET is_deleted = 1 WHERE id = ?",
    );
  }

  getAll(includeDeleted: boolean = false): WorkEntryEntity[] {
    const stmt = includeDeleted
      ? this.stmtGetAllWithDeleted
      : this.stmtGetAllWithoutDeleted;
    const result: WorkEntryEntity[] = stmt.all();
    return result;
  }

  getById(id: number): WorkEntryEntity | null {
    const result: WorkEntryEntity | undefined = this.stmtGetById.get(id);
    return result || null;
  }

  // returns id of created work entry
  create(project_id: number | null, work_date: string, start_time: string, end_time: string, qualification: string, description: string | null): number {
    this.stmtCreate.run(project_id, work_date, start_time, end_time, qualification, description);
    const id = this.db.lastInsertRowId as number;
    return id;
  }

  // return number of rows affected
  update(id: number, project_id: number | null, work_date: string, start_time: string, end_time: string, qualification: string, description: string | null): number {
    // extra validation can not hurt
    if (!work_date || work_date.trim().length === 0) {
      throw new Error("Work date cannot be empty");
    }

    this.stmtUpdate.run(project_id, work_date, start_time, end_time, qualification, description, id);
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
