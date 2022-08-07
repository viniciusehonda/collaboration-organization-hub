export type Sprint = {
    id: number,
    name: string,
    description: string,
    start: Date | number,
    end: Date | number,
    projectId: number,
    milestoneId: number | null
}