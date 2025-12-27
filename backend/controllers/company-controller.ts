import { CompanyDTO } from "../dtos/company-dto.ts";

import { CompanyModel, type CompanyEntity } from "../models/company-model.ts";
import { Context } from "@oak/oak/context";

export const toDTO = (entity: CompanyEntity): CompanyDTO => ({
    id: entity.id,
    name: entity.name,
    isDeleted: entity.is_deleted,
});

// handler factory
export const makeGetAllCompaniesResponse = (companyModel: CompanyModel) => {
    return (ctx: Context) => {
        try {
            const entities = companyModel.getAll();
            const dtos = entities.map(toDTO);
            ctx.response.status = 200;
            ctx.response.body = { data: dtos };
        } catch(err) {
            console.log("getAllCompanies error:", err);
            ctx.response.status = 500;
            ctx.response.body = { error: "Internal server error" };
        }
    }
};