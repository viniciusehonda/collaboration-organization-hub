import Styles from './login-card-styles.scss'
import PasswordIcon from '@mui/icons-material/Password';
import LoginIcon from '@mui/icons-material/Login';

import React, { useEffect } from 'react'
import { useState } from 'react'
import { Box, Button, CircularProgress, Divider, LinearProgress, TextField } from '@mui/material'
import ThemedTextField from '../inputs/ThemedTextField';

type Props = {
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>
}

const LoginCard: React.FC<Props> = (props: Props) => {

    const [loginInputState, setLoginInputState] = useState(false);

    return (
        <div className={Styles.loginCardContainer}>
            <form className={Styles.loginForm} onSubmit={props.handleSubmit}>
                <h2 className={Styles.LoginTitle}>Login</h2>
                <ThemedTextField className={Styles.loginInput} required color={'success'} label={'e-mail'} disabled={loginInputState} variant={'outlined'} />
                <ThemedTextField className={Styles.loginInput} required color={'success'} label={'senha'} disabled={loginInputState} variant={'outlined'} type={'password'}></ThemedTextField>

                <Button className={Styles.loginButton} variant={'contained'} color={'success'} disabled={loginInputState} endIcon={<LoginIcon />} onClick={() => setLoginInputState(!loginInputState)}>
                    Login
                </Button>


            </form>

            {
                loginInputState ?
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