import React from 'react';
import Logo from '../../Logo/Logo';
import styles from './Toolbar.module.css'
import NavItems from '../NavItems/NavItems'
const toolbar = (props) => (

  <header className={styles.Toolbar}  >

  <button className={styles.MenuButton} onClick={props.showMenu}>
  . <br/>
  . <br/>
  . <br/>
  </button>

  <div>
  <Logo/>
  </div>
  <nav>

  <NavItems/>
  </nav>

  </header>
);


export default toolbar;
