import Styles from './signup-styles.scss'
import { Validation } from '@/presentation/protocols/validation'
import { RegisterAccount } from '@/domain/usecases/authentication/registerAccount'

import { Link, useNavigate } from 'react-router-dom'
import React, { useEffect } from 'react'
import { useState } from 'react'
import AppTitle from '@/presentation/components/appTitle/appTitle'

import { useDispatch, useSelector } from "react-redux";
import { RemoteAuthentication } from '@/data/usecases/remote-authentication'
import { RootState } from '@/main/store/store'
import { Account } from '@/domain/models/account'
import ValidationText, { ValidationMessage } from '@/presentation/components/validationText/validationText'
import ThemedTextField from '@/presentation/components/inputs/ThemedTextField'
import { Button, CircularProgress, Divider } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check';
import { UserExistsError } from '@/domain/errors/authentication/user-exists-error'

type Props = {
    validation: Validation,
    registerAccount: RegisterAccount
}

const Signup: React.FC<Props> = ({ validation, registerAccount }: Props) => {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [validationState, setValidationState] = useState(new Array<ValidationMessage>());

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    const dispatch = useDispatch();

    function validate(field: string, input: RegisterAccount.Params): ValidationMessage | null {

        var error = validation.validate(field, input);

        if (error == null || error.length == 0) {
            return null
        }

        return {
            field: field,
            message: error
        }
    }

    const backToLogin = () => {
        navigate('/');
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>, fields: RegisterAccount.Params): Promise<void> => {
        event.preventDefault();

        try {
            setIsLoading(true);
            setValidationState([]);

            let validationErrors = new Array<ValidationMessage>();

            let fieldList = ['firstName', 'lastName', 'email', 'password', 'passwordConfirmation'];

            fieldList.forEach((item) => {
                let validationResult = validate(item, fields)

                if (validationResult) {
                    validationErrors.push(validationResult);
                }
            });

            if (validationErrors.length > 0) {
                setValidationState(validationErrors);
                setIsLoading(false);
                return;
            }

            registerAccount.add(fields)
                .then((account: Account) => {
                    dispatch({
                        type: 'LOGIN_SUCCESS',
                        payload: {
                            account: account
                        }
                    })

                    navigate('/home');
                })
                .catch((error) => {
                    if (error instanceof UserExistsError) {
                        setValidationState(state => [...state, { field: 'email', message: error.message } as ValidationMessage]);
                        return;
                    }

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

    const getValidationErrors = (fieldName: string, validationErrors: ValidationMessage[]) => {

        if (validationErrors == null || validationErrors.length <= 0) {
            return undefined;
        }

        var errors = validationErrors.filter((item) => {
            return item.field == fieldName;
        });

        if (errors != null && errors.length > 0) {
            return errors[0];
        }

        return undefined;
    }

    return (
        <div className={Styles.signupWrap}>
            <AppTitle />
            <div className={Styles.signupCardContainer}>
                <form className={Styles.signupForm} onSubmit={(element) => handleSubmit(element, { firstName: firstName, lastName: lastName, email: email, password: password, passwordConfirmation: passwordConfirmation })}>
                    <h2 className={Styles.signupTitle}>SignUp</h2>
                    <ThemedTextField className={Styles.signupInput} onChange={(e) => setFirstName(e.target.value)} color={'success'} label={'first name'} disabled={isLoading} variant={'outlined'} />
                    <ValidationText validationMessage={getValidationErrors('firstName', validationState)}></ValidationText>
                    <ThemedTextField className={Styles.signupInput} onChange={(e) => setLastName(e.target.value)} color={'success'} label={'last name'} disabled={isLoading} variant={'outlined'} />
                    <ValidationText validationMessage={getValidationErrors('lastName', validationState)}></ValidationText>
                    <ThemedTextField className={Styles.signupInput} onChange={(e) => setEmail(e.target.value)} color={'success'} label={'e-mail'} disabled={isLoading} variant={'outlined'} />
                    <ValidationText validationMessage={getValidationErrors('email', validationState)}></ValidationText>
                    <ThemedTextField className={Styles.signupInput} onChange={(e) => setPassword(e.target.value)} color={'success'} label={'password'} disabled={isLoading} variant={'outlined'} type={'password'}></ThemedTextField>
                    <ValidationText validationMessage={getValidationErrors('password', validationState)}></ValidationText>
                    <ThemedTextField className={Styles.signupInput} onChange={(e) => setPasswordConfirmation(e.target.value)} color={'success'} label={'password confirmation'} disabled={isLoading} variant={'outlined'} type={'password'}></ThemedTextField>
                    <ValidationText validationMessage={getValidationErrors('passwordConfirmation', validationState)}></ValidationText>
                    <Button type="submit" className={Styles.signupButton} variant={'contained'} color={'success'} disabled={isLoading} endIcon={<CheckIcon />} >
                        SignUp
                    </Button>
                    <ValidationText validationMessage={getValidationErrors('default', validationState)}></ValidationText>
                </form>

                {
                    isLoading ?
                        <div className={Styles.signupProgress}>
                            <CircularProgress color="success" />
                        </div>
                        :
                        <></>
                }
                <div className={Styles.loginSignUpContainer}>
                    <Divider />
                    <Button className={Styles.signupButton} variant={'outlined'} color={'success'} onClick={() => backToLogin()}>
                        Back to Login
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Signup