import { makeApiUrl, makeAxiosHttpClient } from '@/main/factories/http'
import { RemoteDeleteTask } from '@/data/usecases/task/remote-delete-task'
import { DeleteTask } from '@/domain/usecases/task/delete-task'

export const makeRemoteDeleteTask= (): DeleteTask =>
  new RemoteDeleteTask(makeApiUrl('/task/delete'), makeAxiosHttpClient())