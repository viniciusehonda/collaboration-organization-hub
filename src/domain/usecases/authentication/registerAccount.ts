import { Account as AccountModel } from '@/domain/models/account'

export interface RegisterAccount {
  add: (params: RegisterAccount.Params) => Promise<RegisterAccount.Model>
}

export namespace RegisterAccount {
  export type Params = {
    firstName: string
    lastName: string
    email: string
    password: string
    passwordConfirmation: string
  }

  export type Model = AccountModel
}