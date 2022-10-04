import { HttpClient, HttpStatusCode } from '@/data/protocols/http/httpClient'
import { SaveTask } from '@/domain/usecases/task/save-task'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors/'
import { Account } from '@/domain/models/account';
import { LocalStorageAdapter } from '@/infra/cache/localStorageAdapter';

export class RemoteSaveTask implements SaveTask {
    constructor(
        private readonly addUrl: string,
        private readonly editUrl: string,
        private readonly httpClient: HttpClient<SaveTask.Model>
    ) { }

    getToken(): string {
        var localStorage = new LocalStorageAdapter();
        const authData = localStorage.get("_authData") as Account;

        return authData ? authData.token : '';
    }

    async add(params: SaveTask.Params): Promise<RemoteSaveTask.Model> {
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

    async edit (model: RemoteSaveTask.Model): Promise<RemoteSaveTask.Model> {
        const httpResponse = await this.httpClient.request({
            url: this.editUrl + '/' + model._id,
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

export namespace RemoteSaveTask {
    export type Model = SaveTask.Model
}