import Styles from './login-styles.scss'
import { Validation } from '@/presentation/protocols/validation'
import { Authentication } from '@/domain/usecases/authentication/authentication'

import { Link, useNavigate } from 'react-router-dom'
import React, { useEffect } from 'react'
import { useState } from 'react'
import LoginCard from '@/presentation/components/login/loginCard'
import AppTitle from '@/presentation/components/appTitle/appTitle'

type Props = {
    validation: Validation,
    authentication: Authentication
}

const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
}

const Login: React.FC<Props> = ({validation, authentication}: Props) => {

    const history = useNavigate();
    const [loginState, setState] = useState()

    return (
        <div className={Styles.loginWrap}>
            <AppTitle />
            <LoginCard  handleSubmit={handleSubmit}/>
        </div>
    )
}

export default Login