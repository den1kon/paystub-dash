import { ProjectModel } from "../models/project-model.ts";

const MOCK_PROJECTS = [
  {
    companyId: 1,
    name: "Acme Project",
    alias: "ACP",
  },
  {
    companyId: 2,
    name: "Globex Project",
    alias: "GP",
  },
];

export const seedProjects = (projectModel: ProjectModel): void => {
  MOCK_PROJECTS.forEach(({ companyId, name, alias }) => {
    projectModel.create(companyId, name, alias);
  });
  console.log(`Seeded ${MOCK_PROJECTS.length} projects.`);
}