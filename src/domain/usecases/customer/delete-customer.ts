import { Customer } from "@/domain/models/customer"

export interface DeleteCustomer {
    delete: (id: string) => Promise<DeleteCustomer.Model>,
}

export namespace DeleteCustomer {
    export type Model = Customer.Model;
}