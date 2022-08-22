import Styles from './login-styles.scss'
import { Validation } from '@/presentation/protocols/validation'
import { Authentication } from '@/domain/usecases/authentication/authentication'

import { Link, useNavigate } from 'react-router-dom'
import React, { useEffect } from 'react'
import { useState } from 'react'

type Props = {
    validation: Validation,
    authentication: Authentication
}


const Login: React.FC<Props> = ({validation, authentication}: Props) => {

    const history = useNavigate();
    const [loginState, setState] = useState()

    return (
        <div className=''>

        </div>
    )
}

export default Login