import Styles from './login-card-styles.scss'
import PasswordIcon from '@mui/icons-material/Password';
import LoginIcon from '@mui/icons-material/Login';

import React, { useEffect } from 'react'
import { useState } from 'react'
import { Box, Button, CircularProgress, Divider, LinearProgress, TextField } from '@mui/material'
import ThemedTextField from '../inputs/ThemedTextField';
import { ValidationMessage } from '../validationText/validationText';
import ValidationText from '../validationText/validationText'

type Props = {
    handleSubmit: (event: React.FormEvent<HTMLFormElement>, email: string, password: string) => Promise<void>,
    isLoading: boolean,
    validationErrors: ValidationMessage[]
}

const LoginCard: React.FC<Props> = (props: Props) => {

    const [loginInputState, setLoginInputState] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const getValidationErrors = (fieldName: string, validationErrors: ValidationMessage[]) => {

        if (validationErrors == null || validationErrors.length <= 0)
        {
            return undefined;
        }

        var errors = validationErrors.filter((item) => {
            return item.field == fieldName;
        });

        if (errors != null && errors.length > 0)
        {
            return errors[0];
        }

        return undefined;
    }

    return (
        <div className={Styles.loginCardContainer}>
            <form className={Styles.loginForm} onSubmit={(element) => props.handleSubmit(element, email, password)}>
                <h2 className={Styles.LoginTitle}>Login</h2>
                <ThemedTextField className={Styles.loginInput} onChange={(e) => setEmail(e.target.value)} color={'success'} label={'e-mail'} disabled={loginInputState} variant={'outlined'} />
                <ValidationText validationMessage={getValidationErrors('email', props.validationErrors)}></ValidationText>
                <ThemedTextField className={Styles.loginInput} onChange={(e) => setPassword(e.target.value)}  color={'success'} label={'password'} disabled={loginInputState} variant={'outlined'} type={'password'}></ThemedTextField>
                <ValidationText validationMessage={getValidationErrors('password', props.validationErrors)}></ValidationText>
                <Button type="submit" className={Styles.loginButton} variant={'contained'} color={'success'} disabled={loginInputState} endIcon={<LoginIcon />} >
                    Login
                </Button>
                <ValidationText validationMessage={getValidationErrors('default', props.validationErrors)}></ValidationText>
            </form>

            {
                props.isLoading ?
                    <div className={Styles.loginProgress}>
                        <CircularProgress color="success" />
                    </div>
                    :
                    <></>
            }
            <div className={Styles.loginSignUpContainer}>
                <Divider />
                <p className={Styles.loginSignUpQuestion}>
                    Don't have an account ?
                </p>
                <Button className={Styles.loginButton} variant={'outlined'} color={'success'} disabled={loginInputState}>
                    Sign up
                </Button>
            </div>
        </div>
    )
}

export default LoginCard