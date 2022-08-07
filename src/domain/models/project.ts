export type Project = {
    id: number,
    name: string,
    description: string,
    companyId: number,
    start: Date | null,
    end: Date | null,
    type: ProjectType
}

enum ProjectType {
    continuous = 1,
    closed = 2,
    other = 90
}

enum ProjectStatus {
    designing = 1,
    waitingStart = 2,
    ongoing = 3,
    paused = 4,
    finished = 90
}