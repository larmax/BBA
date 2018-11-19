import React, {Component} from 'react';
import styles from './Layout.module.css';
import Toolbar from '../Nav/Toolbar/Toolbar';
import SideDrawer from '../Nav/SideDrawer/SideDrawer';

class Layout extends Component {

state = {

  showSideDrawer: false
}

sideDrawerOpenedHandler = () => {
  this.setState({showSideDrawer: true})
    console.log("Menu:",this.state.showSideDrawer);
}
sideDrawerClosedHandler = () => {
  this.setState({showSideDrawer: false})
  console.log("Menu:",this.state.showSideDrawer);
}

render(){
return(
<>
<Toolbar
showMenu={this.sideDrawerOpenedHandler}
/>
<SideDrawer
opened={this.state.showSideDrawer}
close={this.sideDrawerClosedHandler}
/>
<main  className={styles.Content}>
{this.props.children}
</main>
</>
)       }

}

export default Layout;
