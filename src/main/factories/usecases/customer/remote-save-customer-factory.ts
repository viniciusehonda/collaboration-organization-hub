import { makeApiUrl, makeAxiosHttpClient } from '@/main/factories/http'
import { RemoteSaveCustomer } from '@/data/usecases/customer/remote-save-customer'
import { SaveCustomer } from '@/domain/usecases/customer/save-customer'

export const makeRemoteSaveCustomer = (): SaveCustomer =>
  new RemoteSaveCustomer(makeApiUrl('/customer/post'),
   makeApiUrl('/customer/update'),
    makeAxiosHttpClient())