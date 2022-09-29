import { FC } from 'react';
import Styles from './mainPage-styles.scss'

type MainPageProps = {
    children?: React.ReactNode;
}

export const MainPage: FC<MainPageProps> =
    ({ children }) => (
        <div className={Styles.mainPage}>
            {children}
        </div>
    ); 