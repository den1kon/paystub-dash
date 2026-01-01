import { WorkEntryModel } from "../models/work-entry-model.ts";

const MOCK_WORK_ENTRIES = [
  {
    projectId: 1,
    workDate: "2024-06-01",
    startTime: "09:00",
    endTime: "17:00",
    qualification: "Developer",
    description: "Worked on feature X",
  },
  {
    projectId: 2,
    workDate: "2024-06-02",
    startTime: "10:00",
    endTime: "18:00",
    qualification: "Designer",
    description: "Designed UI for feature Y",
  },
];

export const seedWorkEntries = (workEntryModel: WorkEntryModel): void => {
  MOCK_WORK_ENTRIES.forEach(({ projectId, workDate, startTime, endTime, qualification, description }) => {
    workEntryModel.create(projectId, workDate, startTime, endTime, qualification, description);
  });
  console.log(`Seeded ${MOCK_WORK_ENTRIES.length} work entries.`);
}