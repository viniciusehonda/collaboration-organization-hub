import { makeApiUrl, makeAxiosHttpClient } from '@/main/factories/http'
import { RemoteDeleteCustomer } from '@/data/usecases/customer/remote-delete-customer'
import { DeleteCustomer } from '@/domain/usecases/customer/delete-customer'

export const makeRemoteDeleteCustomer= (): DeleteCustomer =>
  new RemoteDeleteCustomer(makeApiUrl('/customer/delete'), makeAxiosHttpClient())