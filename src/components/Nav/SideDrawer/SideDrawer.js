import React from 'react';
import Logo from '../../Logo/Logo'
import NavItemsDrawer from '../NavItems/NavItemsDrawer';
import styles from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop'

const sideDrawer = (props) => {
let attachedStyles = [styles.SideDrawer, styles.Close];

if (props.opened) {
  attachedStyles= [styles.SideDrawer, styles.Open]
  console.log("attachedStyles:",attachedStyles);
}else{
  console.log("attachedStyles:",attachedStyles);
}

  return(
    <>

    <Backdrop show={props.opened} clicked={props.close}/>
    <div className={attachedStyles.join(' ')}>
    <div className={styles.Logo}>
    <button show="true" className={styles.MenuButton} onClick={props.close}>
    X
    </button>

    <Logo/>

    </div>


    <nav>
    <NavItemsDrawer/>
    </nav>
    </div>
</>
  );

};

export default sideDrawer;
