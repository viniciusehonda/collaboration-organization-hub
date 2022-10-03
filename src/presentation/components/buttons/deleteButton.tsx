import Styles from './delete-button-styles.scss'
import PasswordIcon from '@mui/icons-material/Password';
import LoginIcon from '@mui/icons-material/Login';

import React, { useEffect } from 'react'
import { useState } from 'react'
import { Box, Button, CircularProgress, LinearProgress, TextField } from '@mui/material'
import ThemedTextField from '../inputs/ThemedTextField';
import { ArrowRight } from '@mui/icons-material';

type Props = {
    onClick: () => void,
    children?: React.ReactNode;
}

const DeleteButton: React.FC<Props> = (props: Props) => {
    return (
        <button className={Styles.deleteButton} onClick={props.onClick}>{props.children}</button>
    )
}

export default DeleteButton