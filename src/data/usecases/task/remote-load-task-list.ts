import { HttpClient, HttpStatusCode } from '@/data/protocols/http/httpClient'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors/'
import { Account } from '@/domain/models/account';
import { LoadTaskList } from '@/domain/usecases/task/load-task-list'
import { LocalStorageAdapter } from '@/infra/cache/localStorageAdapter';

export class RemoteLoadTaskList implements LoadTaskList {
    constructor(
        private readonly url: string,
        private readonly httpClient: HttpClient<RemoteLoadTaskList.Model[]>
    ) { }

    getToken(): string {
        var localStorage = new LocalStorageAdapter();
        const authData = localStorage.get("_authData") as Account;

        return authData ? authData.token : '';
    }

    async loadAll(): Promise<RemoteLoadTaskList.Model[]> {
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

export namespace RemoteLoadTaskList {
    export type Model = LoadTaskList.Model
}