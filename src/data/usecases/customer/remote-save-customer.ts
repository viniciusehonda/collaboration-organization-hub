import { HttpClient, HttpStatusCode } from '@/data/protocols/http/httpClient'
import { SaveCustomer } from '@/domain/usecases/customer/save-customer'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors/'
import { Account } from '@/domain/models/account';
import { LocalStorageAdapter } from '@/infra/cache/localStorageAdapter';

export class RemoteSaveCustomer implements SaveCustomer {
    constructor(
        private readonly addUrl: string,
        private readonly editUrl: string,
        private readonly httpClient: HttpClient<SaveCustomer.Model>
    ) { }

    getToken(): string {
        var localStorage = new LocalStorageAdapter();
        const authData = localStorage.get("_authData") as Account;

        return authData ? authData.token : '';
    }

    async add(params: SaveCustomer.Params): Promise<RemoteSaveCustomer.Model> {
        const httpResponse = await this.httpClient.request({
            url: this.addUrl,
            headers: {
                'x-access-token': this.getToken()
            },
            method: 'post',
            body: params
        })
        switch (httpResponse.statusCode) {
            case HttpStatusCode.ok: return httpResponse.body!
            case HttpStatusCode.unauthorized: throw new InvalidCredentialsError()
            default: throw new UnexpectedError()
        }
    }

    async edit (model: RemoteSaveCustomer.Model): Promise<RemoteSaveCustomer.Model> {
        const httpResponse = await this.httpClient.request({
            url: this.editUrl,
            headers: {
                'x-access-token': this.getToken()
            },
            method: 'patch',
            body: model
        })
        switch (httpResponse.statusCode) {
            case HttpStatusCode.ok: return httpResponse.body!
            case HttpStatusCode.unauthorized: throw new InvalidCredentialsError()
            default: throw new UnexpectedError()
        }
    }
    
}

export namespace RemoteSaveCustomer {
    export type Model = SaveCustomer.Model
}