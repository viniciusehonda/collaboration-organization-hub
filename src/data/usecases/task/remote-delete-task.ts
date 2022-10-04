import { HttpClient, HttpStatusCode } from '@/data/protocols/http/httpClient'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors/'
import { Account } from '@/domain/models/account';
import { DeleteTask } from '@/domain/usecases/task/delete-task'
import { LocalStorageAdapter } from '@/infra/cache/localStorageAdapter';

export class RemoteDeleteTask implements DeleteTask {
    constructor(
        private readonly url: string,
        private readonly httpClient: HttpClient<DeleteTask.Model>
    ) { }

    getToken(): string {
        var localStorage = new LocalStorageAdapter();
        const authData = localStorage.get("_authData") as Account;

        return authData ? authData.token : '';
    }

    async delete(id: string): Promise<RemoteDeleteTask.Model> {
        const httpResponse = await this.httpClient.request({
            url: this.url + '/' + id,
            headers: {
                'x-access-token': this.getToken()
            },
            method: 'delete'
        })
        switch (httpResponse.statusCode) {
            case HttpStatusCode.ok: return httpResponse.body!
            case HttpStatusCode.unauthorized: throw new InvalidCredentialsError()
            default: throw new UnexpectedError()
        }
    }
    
}

export namespace RemoteDeleteTask {
    export type Model = DeleteTask.Model
}