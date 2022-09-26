import Styles from './validation-text-styles.scss'
import React, { useEffect } from 'react'
import ErrorIcon from '@mui/icons-material/Error';

export type ValidationMessage = {
    field: string,
    message: string
}

type Props = {
    validationMessage?: ValidationMessage
}

const ValidationText: React.FC<Props> = (props: Props) => {
    return (
        props.validationMessage ? <div className={Styles.validationTextContainer}><ErrorIcon className={Styles.validationIcon} /><p className={Styles.validationText}>{props.validationMessage.message}</p></div> : <></>
    )
}

export default ValidationText