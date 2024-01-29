import { Outlet } from "react-router-dom";

import AppNav from "./AppNav";
import Logo from "./Logo";
import styles from './Sidebar.module.css';

const Sidebar = () =>
{
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
    </div>
  )
}

export default Sidebar