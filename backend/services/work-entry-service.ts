import {
  InternalServerError,
  NotFoundError,
} from "../utils/errors.ts";
import { WorkEntryDTO } from "../utils/dtos/work-entry-dto.ts";
import { toDTO } from "../utils/mappers/work-entry-map.ts";
import {
  parseAndValidateIdParam,
  parseAndValidateName,
} from "../utils/company-validator.ts";

import { type WorkEntryModel } from "../models/work-entry-model.ts";

export function getAllWorkEntries(model: WorkEntryModel): WorkEntryDTO[] {
  const rows = model.getAll();
  return rows.map(toDTO);
}

export function createWorkEntry(
  model: WorkEntryModel,
  payload: {
    projectId: number | null;
    workDate: string;
    startTime: string;
    endTime: string;
    qualification: string;
    description: string | null;
  },
): WorkEntryDTO {
  // validate
  const projectId = payload.projectId || null;
  const workDate = parseAndValidateName(payload.workDate);
  const startTime = parseAndValidateName(payload.startTime);
  const endTime = parseAndValidateName(payload.endTime);
  const qualification = parseAndValidateName(payload.qualification);
  const description = payload.description ?? null;

  // create
  const id = model.create(
    projectId,
    workDate,
    startTime,
    endTime,
    qualification,
    description,
  );
  if (!id) throw new InternalServerError("Create work entry failed");
  // fetch created
  const entity = model.getById(id);
  if (!entity) throw new NotFoundError("Created work entry not found");
  return toDTO(entity);
}

export function updateWorkEntry(
  model: WorkEntryModel,
  idParam: string,
  projectId: number | null,
  rawWorkDate: string,
  rawStartTime: string,
  rawEndTime: string,
  rawQualification: string,
  rawDescription: string | null,
): void {
  const id = parseAndValidateIdParam(idParam);

  const updated = model.update(id, projectId, rawWorkDate, rawStartTime, rawEndTime, rawQualification, rawDescription);
  if (updated === 0) throw new NotFoundError("Work entry not found");
}

export function deleteWorkEntry(model: WorkEntryModel, idParam: string): void {
  const id = parseAndValidateIdParam(idParam);

  const deleted = model.softDelete(id);
  if (deleted === 0) throw new NotFoundError("Work entry not found");
}
