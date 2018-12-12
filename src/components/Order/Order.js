import React from 'react';
import styles from './Order.module.css';
  const order = (props) => (
<div className={styles.Order}>
<p> Ingredients: {props.ingredients}</p>

<p> Price {props.price} €</p>
</div>
);
export default order;
