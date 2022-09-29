import { FC } from 'react';
import Styles from './mainLayout-styles.scss'

type MainLayoutProps = {
    children?: React.ReactNode;
}

export const MainLayout: FC<MainLayoutProps> =
    ({ children }) => (
        <div className={Styles.mainContainer}>
            {children}
        </div>
    ); 