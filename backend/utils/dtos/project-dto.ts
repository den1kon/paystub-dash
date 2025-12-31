export interface ProjectDTO {
    id: number;
    companyId: number | null;
    name: string;
    alias: string | null;
    isDeleted: boolean;
}