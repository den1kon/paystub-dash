export type Migration = {
  name: string;
  sql: string;
};

export const migrations: Readonly<Migration[]> = Object.freeze([
  {
    name: "001_create_companies_table",
    sql: `
      CREATE TABLE IF NOT EXISTS companies (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        is_deleted BOOLEAN DEFAULT 0
      )
    `,
  },
  {
    name: "002_create_projects_table",
    sql: `
      CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        company_id INTEGER,
        name TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (company_id) REFERENCES companies (id) ON DELETE SET NULL
      )
    `,
  },
  {
    name: "003_create_work_entries_table",
    sql: `
      CREATE TABLE IF NOT EXISTS work_entries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        project_id INTEGER NOT NULL,
        work_date TEXT NOT NULL CHECK (work_date GLOB '[0-9][0-9][0-9][0-9]-[0-1][0-9]-[0-3][0-9]'),
        start_time TEXT NOT NULL CHECK (start_time GLOB '[0-2][0-9]:[0-5][0-9]'),
        end_time TEXT NOT NULL CHECK (end_time GLOB '[0-2][0-9]:[0-5][0-9]'),
        qualification VARCHAR(255) NOT NULL,
        description TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (project_id) REFERENCES projects (id) ON DELETE SET NULL
      )
    `,
  },
]);