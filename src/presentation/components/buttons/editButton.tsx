import Styles from './edit-button-styles.scss'
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

const EditButton: React.FC<Props> = (props: Props) => {
    return (
        <button className={Styles.editButton} onClick={props.onClick}>{props.children}</button>
    )
}

export default EditButton