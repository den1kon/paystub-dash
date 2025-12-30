import { CompanyDTO } from "../dtos/company-dto.ts";
import { CompanyEntity } from "../../models/company-model.ts";

export const toDTO = (entity: CompanyEntity): CompanyDTO => ({
  id: entity.id,
  name: entity.name,
  isDeleted: Boolean(entity.is_deleted),
});