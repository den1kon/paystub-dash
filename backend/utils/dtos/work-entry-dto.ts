export interface WorkEntryDTO {
  id: number;
  projectId: number | null;
  workDate: string;
  startTime: string;
  endTime: string;
  qualification: string;
  description: string | null;
  isDeleted: boolean;
}
