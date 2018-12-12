import React from 'react';
import styles from './NavItemsDrawer.module.css';
import NavItem from './NavItem/NavItem';


const NavItemsDrawer = () => (
<ul className={styles.NavItems}>
    <NavItem  link="/" active>Burger Builder</NavItem>
    <NavItem link="/">Checkout</NavItem>
</ul>
);

export default NavItemsDrawer;
