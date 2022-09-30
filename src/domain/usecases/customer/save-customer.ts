import { Customer } from "@/domain/models/customer";

export interface SaveCustomer {
    add: (model: SaveCustomer.Params) => Promise<SaveCustomer.Model>,
    edit: (model: SaveCustomer.Model) => Promise<SaveCustomer.Model>
}

export namespace SaveCustomer {
    export type Model = Customer.Model;
    export type Params = Customer.Params;
}