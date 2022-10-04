import Styles from './neutral-button-styles.scss'
import React, { useEffect } from 'react'

type Props = {
    onClick: () => void,
    children?: React.ReactNode;
}

const NeutralButton: React.FC<Props> = (props: Props) => {
    return (
        <button className={`${Styles.button} ${Styles.neutralButton}`} onClick={props.onClick}>
            <div className={Styles.buttonContent}>
                {props.children}
            </div>
        </button>
    )
}

export default NeutralButton