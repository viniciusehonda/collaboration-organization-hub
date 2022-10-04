export type TaskModel = {
    _id: string,
    title: string,
    description: string,
    expectedTime: number,
    realTime: number,
    creation: Date,
    deadline: Date | null,
    creator: string
}

export type TaskParam = {
    title: string,
    description: string,
    expectedTime: number,
    creation: Date,
    deadline: Date | null,
    creator: string
}

export namespace Task {
    export type Model = TaskModel;
    export type Params = TaskParam
}