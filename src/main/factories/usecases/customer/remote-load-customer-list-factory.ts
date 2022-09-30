import { makeApiUrl, makeAxiosHttpClient } from '@/main/factories/http'
import { RemoteLoadCustomerList } from '@/data/usecases/customer/remote-load-customer-list'
import { LoadCustomerList } from '@/domain/usecases/customer/load-customer-list'

export const makeRemoteLoadCustomerList = (): LoadCustomerList =>
  new RemoteLoadCustomerList(makeApiUrl('/customer/getAll'), makeAxiosHttpClient())