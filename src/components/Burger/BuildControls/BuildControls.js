import React from 'react';
import styles from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'


const controls = [
  { label: 'Salad', type: 'salad'},
  { label: 'Cheese', type: 'cheese'},
  { label: 'Bacon', type: 'bacon'},
  { label: 'Meat', type: 'meat'},

];
const buildControls = (props) => (
  <div className={ styles.BuildControls }>
  { controls.map(ctrl => (
    <BuildControl
    key= { ctrl.key }
    label= {ctrl.label}
    added= {() => props.ingredientAdded(ctrl.type)}
    removed={() => props.ingredientRemoved(ctrl.type)}
  disabled={props.disabled[ctrl.type]}
    />


  ))}
  <button className={styles.OrderButton}
   disabled={!props.purchasable}
onClick={props.ordered}
   > Order Now </button>
  </div>

);

export default buildControls;
