import Styles from './login-card-styles.scss'
import PasswordIcon from '@mui/icons-material/Password';
import LoginIcon from '@mui/icons-material/Login';

import React, { useEffect } from 'react'
import { useState } from 'react'
import { Button, CircularProgress, LinearProgress, TextField } from '@mui/material'

type Props = {

}

const LoginCard: React.FC<Props> = (props: Props) => {

    const [loginInputState, setLoginInputState] = useState(false);

    return (
        <div className={Styles.loginCardContainer}>
            <form className={!loginInputState ? Styles.loginForm : Styles.loginFormHidden}>
                <TextField className={Styles.loginInput} required label={'e-mail'} variant={'outlined'}></TextField>
                <TextField className={Styles.loginInput} required label={'senha'} variant={'outlined'} type={'password'}></TextField>

                <Button className={Styles.loginButton} variant={'outlined'} endIcon={<LoginIcon />} onClick={() => setLoginInputState(!loginInputState)}>
                    Login
                </Button>
            </form>

            {
                loginInputState ?
                    <div className={Styles.loginProgress}>
                        <LinearProgress />
                    </div>
                    :
                    <></>
            }
        </div>
    )
}

export default LoginCard