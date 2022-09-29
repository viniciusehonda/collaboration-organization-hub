import { FC } from 'react';
import Styles from './burgerSwipe-styles.scss'

type BurgerProps = {
    isClosed?: boolean;
}

export const BurgerSwipe: FC<BurgerProps> = 
    ({isClosed}) => (
    <span
        className={
            `${Styles.burger}
            ${Styles.burgerSwipe} ${isClosed && Styles.isClosed}`
        }
    />
); 