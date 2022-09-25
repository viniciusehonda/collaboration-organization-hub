import Styles from './login-styles.scss'
import { Validation } from '@/presentation/protocols/validation'
import { Authentication } from '@/domain/usecases/authentication/authentication'

import { Link, useNavigate } from 'react-router-dom'
import React, { useEffect } from 'react'
import { useState } from 'react'
import LoginCard from '@/presentation/components/login/loginCard'
import AppTitle from '@/presentation/components/appTitle/appTitle'

import { useDispatch, useSelector } from "react-redux";
import { RemoteAuthentication } from '@/data/usecases/remote-authentication'
import { RootState } from '@/main/store/store'
import { Account } from '@/domain/models/account'

type Props = {
    validation: Validation,
    authentication: Authentication
}

const Login: React.FC<Props> = ({validation, authentication}: Props) => {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [loginState, setState] = useState(false);

    const isLoggedIn = useSelector((state: RootState) => {
        return state.isLoggedIn;
    })

    const dispatch = useDispatch();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>, email: string, password: string): Promise<void> => {
        event.preventDefault();

        try{

            setIsLoading(true);

            authentication.auth({
                email: email,
                password: password
            }).then((account: Account) => {
                dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: {
                        account: account
                    }
                })

                navigate('/');
            })
            .catch((error) => {
                console.log("error", error);
            })
            .finally(() => {
                setIsLoading(false);
            });

        } catch (error) {

        }
    }

    return (
        <div className={Styles.loginWrap}>
            <AppTitle />
            <LoginCard isLoading={isLoading} handleSubmit={handleSubmit}/>
        </div>
    )
}

export default Login