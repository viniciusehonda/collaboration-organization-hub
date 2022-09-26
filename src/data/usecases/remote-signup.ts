import { HttpClient, HttpStatusCode } from '@/data/protocols/http/httpClient'
import { RegisterAccount } from '@/domain/usecases/authentication/registerAccount'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors/'

export class RemoteSignup implements RegisterAccount {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteSignup.Model>
  ) {}

  async add (params: RegisterAccount.Params): Promise<RegisterAccount.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'post',
      body: params
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body!
      case HttpStatusCode.unauthorized: throw new InvalidCredentialsError()
      default: throw new UnexpectedError()
    }
  }
}

export namespace RemoteSignup {
  export type Model = RegisterAccount.Model
}