import Styles from './sidebar-styles.scss'
import { Divider, List, ListItem, ListItemText } from "@mui/material";
import { useSelector } from 'react-redux';
import { RootState } from '@/main/store/store';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from 'react';
import { BurgerSwipe } from './burgerSwipe';
import { SidebarUser } from './sidebarUser';

export type SidebarItem = {
  name: string,
  label: string,
  path: string,
}

type Props = {
  items: SidebarItem[]
}

const Sidebar: React.FC<Props> = (props: Props) => {

  const isLoggedIn = useSelector((state: RootState) => {
    return state.isLoggedIn;
  });

  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (isLoggedIn ? <React.Fragment>
    <div className={Styles.sidebarWrap}>
      <div className={Styles.toggleButtonWrap}>
        <button
          className={Styles.toggleButton}
            onClick={() => { showSidebar(); }}>
            <BurgerSwipe isClosed={sidebar}></BurgerSwipe>
          </button>
      </div>
      <SidebarUser />
    </div>
    <nav className={sidebar ? `${Styles.navMenu} ${Styles.active}` : Styles.navMenu}>
      <ul className={Styles.navMenuItems} onClick={showSidebar}>
        {props.items.map((item, idx) => {
          return (
            <li key={idx} className={Styles.menuItem}>
              <Link to={item.path} className={Styles.navTextLink}>
                {/* {item.icon} */}
                <span className={Styles.menuItemText}>{item.label}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  </React.Fragment> : <></>)
}

export default Sidebar;