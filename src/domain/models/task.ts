export type Task = {
    id: number,
    name: string,
    description: string,
    time: number | null,
    plannedTime: number,
    userId: number | null,
    projectId: number,
    sprintId: number | null,
    milestoneId: number | null
}