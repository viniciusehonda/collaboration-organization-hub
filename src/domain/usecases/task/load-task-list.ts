import { Task } from "@/domain/models/task"

export interface LoadTaskList {
    loadAll: () => Promise<LoadTaskList.Model[]>
}

export namespace LoadTaskList {
    export type Model = Task.Model;
}