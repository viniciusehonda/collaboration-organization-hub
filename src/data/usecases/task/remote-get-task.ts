import { HttpClient, HttpStatusCode } from '@/data/protocols/http/httpClient'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors/'
import { Account } from '@/domain/models/account';
import { GetTask } from '@/domain/usecases/task/get-task'
import { LocalStorageAdapter } from '@/infra/cache/localStorageAdapter';

export class RemoteGetTask implements GetTask {
    constructor(
        private readonly url: string,
        private readonly httpClient: HttpClient<RemoteGetTask.Model>
    ) { }

    getToken(): string {
        var localStorage = new LocalStorageAdapter();
        const authData = localStorage.get("_authData") as Account;

        return authData ? authData.token : '';
    }

    async get(id: string): Promise<RemoteGetTask.Model> {
        const httpResponse = await this.httpClient.request({
            url: this.url + '/' + id,
            headers: {
                'x-access-token': this.getToken()
            },
            method: 'get'
        })
        switch (httpResponse.statusCode) {
            case HttpStatusCode.ok: return httpResponse.body!
            case HttpStatusCode.unauthorized: throw new InvalidCredentialsError()
            default: throw new UnexpectedError()
        }
    }
}

export namespace RemoteGetTask {
    export type Model = GetTask.Model
}