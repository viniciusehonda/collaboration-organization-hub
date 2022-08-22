import { makeApiUrl, makeAxiosHttpClient } from '@/main/factories/http'
import { RemoteAuthentication } from '@/data/usecases/remote-authentication'
import { Authentication } from '@/domain/usecases/authentication/authentication'

export const makeRemoteAuthentication = (): Authentication =>
  new RemoteAuthentication(makeApiUrl('/login'), makeAxiosHttpClient())