import { Task } from "@/domain/models/task"

export interface GetTask {
    get: (id: string) => Promise<GetTask.Model>
}

export namespace GetTask {
    export type Model = Task.Model;
}