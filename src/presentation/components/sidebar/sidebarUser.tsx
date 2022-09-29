import { RootState } from '@/main/store/store';
import { Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Styles from './sidebarUser-styles.scss'
import LogoutIcon from '@mui/icons-material/Logout';

type SidebarUserProps = {

}

export const SidebarUser: FC<SidebarUserProps> =
    () => {

        const [userOptions, setUserOptions] = useState(false);
        const account = useSelector((state: RootState) => {
            return state.account;
        });

        const dispatch = useDispatch();

        function logout() {
            dispatch({
                type: 'LOGOUT',
                payload: { }
            })
        }

        function stringToColor(string: string) {
            let hash = 0;
            let i;

            /* eslint-disable no-bitwise */
            for (i = 0; i < string.length; i += 1) {
                hash = string.charCodeAt(i) + ((hash << 5) - hash);
            }

            let color = '#';

            for (i = 0; i < 3; i += 1) {
                const value = (hash >> (i * 8)) & 0xff;
                color += `00${value.toString(16)}`.slice(-2);
            }
            /* eslint-enable no-bitwise */

            return color;
        }

        function stringAvatar(name: string) {
            return {
                sx: {
                    bgcolor: stringToColor(name),
                },
                children: `${(name.split(' ')[0][0]).toUpperCase()}${(name.split(' ')[1][0]).toUpperCase()}`,
            };
        }

        function stringAvatarOptions(name: string) {
            return {
                sx: {
                    bgcolor: stringToColor(name),
                    width: 100,
                    height: 100
                },
                children: `${(name.split(' ')[0][0]).toUpperCase()}${(name.split(' ')[1][0]).toUpperCase()}`,
            };
        }

        return (
            <div className={Styles.userBar} onClick={() => setUserOptions(!userOptions)}>
                <Avatar className={userOptions ? `${Styles.userAvatar} ${Styles.active}` : Styles.userAvatar} {...stringAvatar(`${account?.firstName} ${account?.lastName}`)} />
                <span className={Styles.userInfo}>
                    {account?.firstName}
                </span>

                <div className={userOptions ? `${Styles.userOptions} ${Styles.active}` : Styles.userOptions}>
                    <div className={Styles.userInfoComplete}>
                        <Avatar className={Styles.userAvatar} {...stringAvatarOptions(`${account?.firstName} ${account?.lastName}`)} />
                        <span className={Styles.userInfoOptions}>
                            {account?.firstName} {account?.lastName}
                        </span>
                    </div>
                    <div className={Styles.userActions}>
                        <button className={Styles.logoutButton} onClick={logout}>
                            <LogoutIcon /> Logout
                        </button>
                    </div>
                </div>
            </div>)
    } 