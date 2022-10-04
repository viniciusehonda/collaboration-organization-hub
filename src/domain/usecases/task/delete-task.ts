import { Task } from "@/domain/models/task"

export interface DeleteTask {
    delete: (id: string) => Promise<DeleteTask.Model>,
}

export namespace DeleteTask {
    export type Model = Task.Model;
}