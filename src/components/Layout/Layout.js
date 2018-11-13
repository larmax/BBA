import React from 'react';
import styles from './Layout.module.css';

const Layout = ( props ) => (
  <>

<div className={styles.Content}> Toolbar, SideDrawer, Backdrop </div>
<main>
{props.children}
</main>
</>
)

export default Layout;
