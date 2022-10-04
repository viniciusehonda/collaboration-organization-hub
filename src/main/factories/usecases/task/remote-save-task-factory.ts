import { makeApiUrl, makeAxiosHttpClient } from '@/main/factories/http'
import { RemoteSaveTask } from '@/data/usecases/task/remote-save-task'
import { SaveTask } from '@/domain/usecases/task/save-task'

export const makeRemoteSaveTask = (): SaveTask =>
  new RemoteSaveTask(makeApiUrl('/task/post'),
   makeApiUrl('/task/update'),
    makeAxiosHttpClient())