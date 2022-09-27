export class UserExistsError extends Error {
    constructor () {
      super('Este e-mail já está em uso!')
      this.name = 'UserExistsError'
    }
  }