import { makeApiUrl, makeAxiosHttpClient } from '@/main/factories/http'
import { RemoteSignup } from '@/data/usecases/remote-signup'
import { RegisterAccount } from '@/domain/usecases/authentication/registerAccount'

export const makeRemoteSignup = (): RegisterAccount =>
  new RemoteSignup(makeApiUrl('/authentication/register'), makeAxiosHttpClient())