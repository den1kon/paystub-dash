import { NotFoundError, ValidationError, InternalServerError } from "../utils/errors.ts";
import { ProjectDTO } from "../utils/dtos/project-dto.ts";
import { toDTO } from "../utils/mappers/project.ts";
import { parseAndValidateName, parseAndValidateIdParam } from "../utils/company-validator.ts";

import { type ProjectModel } from "../models/project-model.ts";

export function getAllProjects(model: ProjectModel): ProjectDTO[] {
  const rows = model.getAll();
  return rows.map(toDTO);
}

export function createProject(model: ProjectModel, payload: { companyId: number | null, name: string, alias?: string | null }): ProjectDTO {
  if (!payload?.name) throw new ValidationError("name required");

  // validate
  const name = parseAndValidateName(payload.name);
  const companyId = payload.companyId || null;
  const alias: string | null = payload.alias ?? null;

  // create
  const id = model.create(companyId, name,  alias);
  if (!id) throw new InternalServerError("Create project failed");

  // fetch created
  const entity = model.getById(id);
  if (!entity) throw new NotFoundError("Created project not found");
  return toDTO(entity);
}

export function updateProjectName(model: ProjectModel, idParam: string, rawName: string, rawAlias?: string): void {
  const id = parseAndValidateIdParam(idParam);

  const name = parseAndValidateName(rawName);
  const alias: string | null = rawAlias ?? null;
  const companyId = null; // keep existing company association

  const updated = model.update(id, companyId, name, alias);
  if (updated === 0) throw new NotFoundError("Project not found");
}
    
export function deleteProject(model: ProjectModel, idParam: string): void {
  const id = parseAndValidateIdParam(idParam);

  const deleted = model.softDelete(id);
  if (deleted === 0) throw new NotFoundError("Project not found");
}