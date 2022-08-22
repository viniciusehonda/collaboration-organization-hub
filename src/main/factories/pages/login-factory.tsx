import { makeLoginValidation } from '@/main/factories/validation/login-validation-factory'
import { makeRemoteAuthentication } from '@/main/factories/usecases/remote-authentication-factory'
import Login  from '@/presentation/pages/login/login'

import React from 'react'

export const makeLogin: React.FC = () => {
  return (
    <Login
      authentication={makeRemoteAuthentication()}
      validation={makeLoginValidation()}
    />
  )
}