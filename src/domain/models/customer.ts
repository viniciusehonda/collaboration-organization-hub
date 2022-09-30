export type CustomerModel = {
    _id: string,
    name: string,
    description: string
}

export type CustomerParam = {
    name: string,
    description: string
}

export namespace Customer {
    export type Model = CustomerModel;
    export type Params = CustomerParam
}