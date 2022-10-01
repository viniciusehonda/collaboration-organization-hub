import CustomerCreate  from '@/presentation/pages/customer/customer-create'
import React from 'react'
import { makeRemoteGetCustomer } from '../usecases/customer/remote-get-customer-factory'
import { makeRemoteSaveCustomer } from '../usecases/customer/remote-save-customer-factory'
import { makeCustomerValidation } from '../validation/customer/customer-validation-factory'

export const makeCustomerForm: React.FC = () => {
  return (
    <CustomerCreate
      saveCustomer={makeRemoteSaveCustomer()}
      getCustomer={makeRemoteGetCustomer()}
      validation={makeCustomerValidation()}
    />
  )
}