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
  <p> Price: { props.price }€ </p>
  { controls.map(ctrl => (
    <BuildControl
    key = { ctrl.label }
    label= {ctrl.label}
    added= {() => props.ingredientAdded(ctrl.type)}
    removed={() => props.ingredientRemoved(ctrl.type)}
      moreDisabled={props.moreDisabled[ctrl.type]}
  lessDisabled={props.lessDisabled[ctrl.type]}


    />
  ))}
  <button className={styles.OrderButton}
   disabled={!props.purchasable}
onClick={props.ordered}
   > Order Now </button>
  </div>

);

export default buildControls;
