import { makeApiUrl, makeAxiosHttpClient } from '@/main/factories/http'
import { RemoteGetCustomer } from '@/data/usecases/customer/remote-get-customer'
import { GetCustomer } from '@/domain/usecases/customer/get-customer'

export const makeRemoteGetCustomer = (): GetCustomer =>
  new RemoteGetCustomer(makeApiUrl('/customer/get'), makeAxiosHttpClient())