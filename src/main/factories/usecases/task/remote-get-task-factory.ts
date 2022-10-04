import { makeApiUrl, makeAxiosHttpClient } from '@/main/factories/http'
import { RemoteGetTask } from '@/data/usecases/task/remote-get-task'
import { GetTask } from '@/domain/usecases/task/get-task'

export const makeRemoteGetTask = (): GetTask =>
  new RemoteGetTask(makeApiUrl('/task/get'), makeAxiosHttpClient())