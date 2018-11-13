import React from 'react';

const OrderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients)
  .map(igKey => {
    return (
      <li key= {igKey}> <span  style={{textTransform: 'capitalize'}}> {igKey} </span>: {props.ingredients[igKey]}
    </li>);
  })
  console.log('ingredientSummary:',ingredientSummary);
  return(
    <>
    <h3> Yourder </h3>
    <h3> Burger ingredients </h3>
    <ul>
    {ingredientSummary}
    </ul>

<p> Continue to checkout? </p>

    </>
  );

};

export default OrderSummary;
