export type milestone = {
    id: number,
    name: string,
    description: string,
    start: Date | null,
    end: Date | null,
    status: milestoneStatus,
    projectId: number
}

enum milestoneStatus {
    waiting = 1,
    ongoing = 2,
    paused = 3,
    finished = 80,
    deployed = 90,
}