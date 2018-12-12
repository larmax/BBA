import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavItem.module.css';

const navItem = ( props ) => (
  <ul className={styles.NavItem}>
        <NavLink
            to={props.link}
            exact={props.exact}
            activeClassName={styles.active}>{props.children}</NavLink>
    </ul>
);

export default navItem;
