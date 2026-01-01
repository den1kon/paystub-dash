import { WorkEntryDTO } from "../dtos/work-entry-dto.ts";
import { WorkEntryEntity } from "../../models/work-entry-model.ts";

export const toDTO = (entity: WorkEntryEntity): WorkEntryDTO => ({
  id: entity.id,
  projectId: entity.project_id,
  workDate: entity.work_date,
  startTime: entity.start_time,
  endTime: entity.end_time,
  qualification: entity.qualification,
  description: entity.description,
  isDeleted: Boolean(entity.is_deleted),
});
