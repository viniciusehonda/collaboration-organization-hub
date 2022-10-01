import CustomerUpdate  from '@/presentation/pages/customer/customer-update'
import React from 'react'
import { makeRemoteGetCustomer } from '../usecases/customer/remote-get-customer-factory'
import { makeRemoteSaveCustomer } from '../usecases/customer/remote-save-customer-factory'
import { makeCustomerValidation } from '../validation/customer/customer-validation-factory'

export const makeCustomerUpdate: React.FC = () => {
  return (
    <CustomerUpdate
      saveCustomer={makeRemoteSaveCustomer()}
      getCustomer={makeRemoteGetCustomer()}
      validation={makeCustomerValidation()}
    />
  )
}