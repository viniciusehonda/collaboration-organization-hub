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
import { ValidationMessage } from '@/presentation/components/validationText/validationText'

type Props = {
    validation: Validation,
    authentication: Authentication
}

type LoginFields = {
    email?: string,
    password?: string
}

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [loginState, setState] = useState(false);
    const [validationState, setValidationState] = useState(new Array<ValidationMessage>());

    const isLoggedIn = useSelector((state: RootState) => {
        return state.isLoggedIn;
    })

    const dispatch = useDispatch();

    function validate(field: string, input: LoginFields): ValidationMessage | null {

        var error = validation.validate(field, input);

        if (error == null || error.length == 0) {
            return null
        }

        return {
            field: field,
            message: error
        }
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>, email: string, password: string): Promise<void> => {
        event.preventDefault();

        try {

            setIsLoading(true);
            setValidationState([]);

            let loginFields: LoginFields = {
                email: email,
                password: password
            };

            let validationErrors = new Array<ValidationMessage>();
            var emailValidation = validate('email', loginFields);

            if (emailValidation) {
                validationErrors.push(emailValidation);
            }

            var passwordValidation = validate('password', loginFields);

            if (passwordValidation) {
                validationErrors.push(passwordValidation);
            }

            if (validationErrors.length > 0) {
                setValidationState(validationErrors);
                setIsLoading(false);
                return;
            }

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
                    if (error && error.message) {
                        setValidationState(state => [...state, { field: 'default', message: error.message } as ValidationMessage]);
                    }
                })
                .finally(() => {
                    setIsLoading(false);
                });

        } catch (error: any) {
            if (error && error.message) {
                setValidationState(state => [...state, { field: 'default', message: error.message } as ValidationMessage]);
            }
        }
    }

    return (
        <div className={Styles.loginWrap}>
            <AppTitle />
            <LoginCard isLoading={isLoading} handleSubmit={handleSubmit} validationErrors={validationState} />
        </div>
    )
}

export default Login