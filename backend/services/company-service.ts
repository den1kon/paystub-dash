import { NotFoundError, ValidationError, InternalServerError } from "../utils/errors.ts";
import { CompanyDTO } from "../dtos/company-dto.ts";
import { toDTO } from "../mappers/company.ts";
import { parseAndValidateName, parseAndValidateIdParam } from "../utils/company-validator.ts";

import { type CompanyModel } from "../models/company-model.ts";

export function getAllCompanies(model: CompanyModel): CompanyDTO[] {
  const rows = model.getAll();
  return rows.map(toDTO);
}

export function createCompany(model: CompanyModel, payload: { name: string }): CompanyDTO {
  if (!payload?.name) throw new ValidationError("name required");

  // validate
  const name = parseAndValidateName(payload.name);

  // create
  const id = model.create(name);
  if (!id) throw new InternalServerError("Create company failed");

  // fetch created
  const entity = model.getById(id);
  if (!entity) throw new NotFoundError("Created company not found");

  return toDTO(entity);
}

export function updateCompanyName(model: CompanyModel, idParam: string, rawName: string): void {
  const id = parseAndValidateIdParam(idParam);

  const name = parseAndValidateName(rawName);

  const updated = model.updateName(id, name);
  if (updated === 0) throw new NotFoundError("Company not found");
}

export function deleteCompany(model: CompanyModel, idParam: string): void {
  const id = parseAndValidateIdParam(idParam);

  const deleted = model.softDelete(id);
  if (deleted === 0) throw new NotFoundError("Company not found");
}