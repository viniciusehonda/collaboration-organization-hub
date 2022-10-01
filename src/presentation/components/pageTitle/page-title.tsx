import Styles from './page-title-styles.scss'
import PasswordIcon from '@mui/icons-material/Password';
import LoginIcon from '@mui/icons-material/Login';

import React, { useEffect } from 'react'
import { useState } from 'react'
import { Box, Button, CircularProgress, LinearProgress, TextField } from '@mui/material'
import ThemedTextField from '../inputs/ThemedTextField';
import { ArrowRight } from '@mui/icons-material';

type Props = {
    title: string
}

const PageTitle: React.FC<Props> = (props: Props) => {
    return (
        <div className={Styles.pageTitleContainer}>
            <h2 className={Styles.pageTitle}> {props.title} </h2>
            <hr className={Styles.separator} />
            <br />
        </div>
    )
}

export default PageTitle