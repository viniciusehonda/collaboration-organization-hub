import { makeSignupValidation } from '@/main/factories/validation/signup-validation-factory'
import { makeRemoteSignup} from '@/main/factories/usecases/remote-signup-factory'
import Signup  from '@/presentation/pages/signup/signup'

import React from 'react'

export const makeSignup: React.FC = () => {
  return (
    <Signup
      registerAccount={makeRemoteSignup()}
      validation={makeSignupValidation()}
    />
  )
}