import Styles from './app-title-styles.scss'
import PasswordIcon from '@mui/icons-material/Password';
import LoginIcon from '@mui/icons-material/Login';

import React, { useEffect } from 'react'
import { useState } from 'react'
import { Box, Button, CircularProgress, LinearProgress, TextField } from '@mui/material'
import ThemedTextField from '../inputs/ThemedTextField';
import { ArrowRight } from '@mui/icons-material';

type Props = {

}

const AppTitle: React.FC<Props> = (props: Props) => {
    return (
        <div className={Styles.appTitleContainer}>
            <h2 className={Styles.appTitle}> Create <ArrowRight />  Organize <ArrowRight />  Collaborate </h2>
        </div>
    )
}

export default AppTitle