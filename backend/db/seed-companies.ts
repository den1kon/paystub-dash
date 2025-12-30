import { CompanyModel } from "../models/company-model.ts";

const MOCK_COMPANIES = [
  {
    name: "Acme Corp",
    alias: "ACME",
  },
  {
    name: "Globex Corporation",
    alias: "Globex",
  },
];

export const seedCompanies = (companyModel: CompanyModel): void => {
  MOCK_COMPANIES.forEach(({ name, alias }) => {
    companyModel.create(name, alias);
  });
  console.log(`Seeded ${MOCK_COMPANIES.length} companies.`);
}