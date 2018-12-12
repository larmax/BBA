import React from 'react';
import styles from './NavItems.module.css';
import NavItem from './NavItem/NavItem';

const navItems = () => (
<li className={styles.NavItems}>
    <NavItem link="/" exact >Burger Builder</NavItem>
    <NavItem link="/orders">Orders</NavItem>
</li >
);

export default navItems;
