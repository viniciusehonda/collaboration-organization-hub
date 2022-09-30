import { HttpClient, HttpStatusCode } from '@/data/protocols/http/httpClient'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors/'
import { Account } from '@/domain/models/account';
import { DeleteCustomer } from '@/domain/usecases/customer/delete-customer'
import { LocalStorageAdapter } from '@/infra/cache/localStorageAdapter';

export class RemoteDeleteCustomer implements DeleteCustomer {
    constructor(
        private readonly url: string,
        private readonly httpClient: HttpClient<DeleteCustomer.Model>
    ) { }

    getToken(): string {
        var localStorage = new LocalStorageAdapter();
        const authData = localStorage.get("_authData") as Account;

        return authData ? authData.token : '';
    }

    async delete(id: string): Promise<RemoteDeleteCustomer.Model> {
        const httpResponse = await this.httpClient.request({
            url: this.url,
            headers: {
                'x-access-token': this.getToken()
            },
            method: 'delete',
            body: id
        })
        switch (httpResponse.statusCode) {
            case HttpStatusCode.ok: return httpResponse.body!
            case HttpStatusCode.unauthorized: throw new InvalidCredentialsError()
            default: throw new UnexpectedError()
        }
    }
    
}

export namespace RemoteDeleteCustomer {
    export type Model = DeleteCustomer.Model
}