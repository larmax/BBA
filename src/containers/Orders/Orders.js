import React, {Component} from 'react';

import Order from '../../components/Order/Order';
import styles from './Orders.module.css';
import axios from '../../axios-orders';
import withErrorHandler from '../../containers/hoc/withErrorHandler/withErrorHandler';

class Orders extends Component{
state = {
  orders: [],
  loading: true,


}
componentDidMount(){

axios.get('/orders.json')
  .then(res=> {
    console.log(res.data);
const fetchedOrders = [];
    for (let key in res.data) {
      fetchedOrders.push({
        ...res.data[key],
        id: key
      });
    }
    this.setState({loading:false, orders: fetchedOrders});

    console.log(this.state.orders);
  })
.catch(err =>{
      this.setState({loading:false})
})
}
ingredientsToArray(ingredients){
let  ingredientsArr = [];
  for (let ingredientName in ingredients) {
  ingredientsArr.push({name: ingredientName, amount: ingredients[ingredientName]});
    }
  const ingredientOutput = ingredientsArr.map(ig => {
       return <span
           style={{
               textTransform: 'capitalize',
               margin: '0 8px',
               padding: '5px'
               }}
           key={ig.name}>{ig.name} ({ig.amount})</span>;
   });
return ingredientOutput;


}





render() {
  const order = (
    this.state.orders.map(order =>
  <Order
  key={order.id}
  ingredients={this.ingredientsToArray(order.burgerIngredients)}
  price={order.price}
  />)
)
  return (
<div className={styles.Orders}>
{order}
</div>
  );
}
}

export default withErrorHandler(Orders, axios);
