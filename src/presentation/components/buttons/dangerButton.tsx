import Styles from './danger-button-styles.scss'
import React, { useEffect } from 'react'

type Props = {
    onClick: () => void,
    children?: React.ReactNode;
}

const DangerButton: React.FC<Props> = (props: Props) => {
    return (
        <button className={`${Styles.button} ${Styles.dangerButton}`} onClick={props.onClick}>
            <div className={Styles.buttonContent}>
                {props.children}
            </div>
        </button>
    )
}

export default DangerButton