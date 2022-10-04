import { Task } from "@/domain/models/task"

export interface SaveTask {
    add: (model: SaveTask.Params) => Promise<SaveTask.Model>,
    edit: (model: SaveTask.Model) => Promise<SaveTask.Model>
}

export namespace SaveTask {
    export type Model = Task.Model;
    export type Params = Task.Params;
}