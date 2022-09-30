import { Customer } from "@/domain/models/customer"

export interface GetCustomer {
    get: (id: string) => Promise<GetCustomer.Model>
}

export namespace GetCustomer {
    export type Model = Customer.Model;
}