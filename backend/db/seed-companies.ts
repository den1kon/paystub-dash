import { CompanyModel } from "../models/company-model.ts";

const MOCK_COMPANIES = [
  "Acme Corp",
  "Globex Corporation",
  "Initech",
  "Umbrella Corporation",
  "Hooli",
  "Stark Industries",
  "Wayne Enterprises",
  "Wonka Industries",
  "Cyberdyne Systems",
  "Tyrell Corporation",
];

export const seedCompanies = (companyModel: CompanyModel): void => {
  MOCK_COMPANIES.forEach((name) => {
    companyModel.create(name);
  });
  console.log(`Seeded ${MOCK_COMPANIES.length} companies.`);
}