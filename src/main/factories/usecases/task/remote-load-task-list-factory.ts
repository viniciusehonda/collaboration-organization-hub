import { makeApiUrl, makeAxiosHttpClient } from '@/main/factories/http'
import { RemoteLoadTaskList } from '@/data/usecases/task/remote-load-task-list'
import { LoadTaskList } from '@/domain/usecases/task/load-task-list'

export const makeRemoteLoadTaskList = (): LoadTaskList =>
  new RemoteLoadTaskList(makeApiUrl('/task/getAll'), makeAxiosHttpClient())