import { ProjectDTO } from "../dtos/project-dto.ts";
import { ProjectEntity } from "../../models/project-model.ts";

export const toDTO = (entity: ProjectEntity): ProjectDTO => ({
  id: entity.id,
  companyId: entity.company_id,
  name: entity.name,
  alias: entity.alias,
  isDeleted: Boolean(entity.is_deleted),
});