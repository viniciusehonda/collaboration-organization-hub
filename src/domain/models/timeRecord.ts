export type timeRecord = {
    id: number,
    description: string,
    start: Date,
    end: Date | null,
    taskId: number,
    userId: number
}