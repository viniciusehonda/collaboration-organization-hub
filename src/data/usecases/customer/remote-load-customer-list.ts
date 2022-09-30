import { HttpClient, HttpStatusCode } from '@/data/protocols/http/httpClient'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors/'
import { Account } from '@/domain/models/account';
import { LoadCustomerList } from '@/domain/usecases/customer/load-customer-list'
import { LocalStorageAdapter } from '@/infra/cache/localStorageAdapter';

export class RemoteLoadCustomerList implements LoadCustomerList {
    constructor(
        private readonly url: string,
        private readonly httpClient: HttpClient<RemoteLoadCustomerList.Model[]>
    ) { }

    getToken(): string {
        var localStorage = new LocalStorageAdapter();
        const authData = localStorage.get("_authData") as Account;

        return authData ? authData.token : '';
    }

    async loadAll(): Promise<RemoteLoadCustomerList.Model[]> {
        const httpResponse = await this.httpClient.request({
            url: this.url,
            headers: {
                'x-access-token': this.getToken()
            },
            method: 'get'
        })
        const remoteCustomers = httpResponse.body || [];
        switch (httpResponse.statusCode) {
            case HttpStatusCode.ok: return remoteCustomers
            case HttpStatusCode.unauthorized: throw new InvalidCredentialsError()
            default: throw new UnexpectedError()
        }
    }
}

export namespace RemoteLoadCustomerList {
    export type Model = LoadCustomerList.Model
}