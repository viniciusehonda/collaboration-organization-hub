import { Customer } from "@/domain/models/customer"

export interface LoadCustomerList {
    loadAll: () => Promise<LoadCustomerList.Model[]>
}

export namespace LoadCustomerList {
    export type Model = Customer.Model;
}