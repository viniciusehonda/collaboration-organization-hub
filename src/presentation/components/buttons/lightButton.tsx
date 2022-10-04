import Styles from './light-button-styles.scss'
import React, { useEffect } from 'react'

type Props = {
    onClick: () => void,
    children?: React.ReactNode;
}

const LightButton: React.FC<Props> = (props: Props) => {
    return (
        <button className={`${Styles.button} ${Styles.lightButton}`} onClick={props.onClick}>
            <div className={Styles.buttonContent}>
                {props.children}
            </div>
        </button>
    )
}

export default LightButton