import Customer  from '@/presentation/pages/customer/customer'
import React from 'react'
import { makeRemoteLoadCustomerList } from '../usecases/customer/remote-load-customer-list-factory'
import { makeRemoteDeleteCustomer } from '../usecases/customer/remote-delete-customer-factory'
import { makeRemoteSaveCustomer } from '../usecases/customer/remote-save-customer-factory'
import { makeCustomerValidation } from '../validation/customer/customer-validation-factory'

export const makeCustomer: React.FC = () => {
  return (
    <Customer
      loadCustomerList={makeRemoteLoadCustomerList()}
      saveCustomer={makeRemoteSaveCustomer()}
      deleteCustomer={makeRemoteDeleteCustomer()}
      validation={makeCustomerValidation()}
    />
  )
}