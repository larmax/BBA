import React, {Component} from 'react';

import Spinner from '../../components/UI/Spinner/Spinner';
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

    console.log('orders',this.state.orders);

  })

.catch(err =>{
      this.setState({loading:false})
})
}
ingredientsToArray(ingredients){
const  ingredientsArr = [];
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
   console.log('ingredientOutput',ingredientOutput);
return ingredientOutput;

}
orderDataToArray(orderData){
  console.log('orderData', orderData);
const  orderDataArr = [];
  for (let field in orderData) {
   orderDataArr.push({fieldForm: field, value: orderData[field]});
    }
  const orderDataOutput =  orderDataArr.map(ig => {
  if (typeof(ig.value) === "object" || ig.value === null) {
    console.log('1igvalue type:',typeof(ig.value),ig.value);
return ig.fieldForm + ": not available "
}else {
     console.log('2igvalue type:',typeof(ig.value),ig.value);
   return ig.fieldForm + ": " + ig.value + " "

}

   });
   console.log('orderFromOutput',orderDataOutput);
return orderDataOutput;

}



render() {
let spinner = "";
if (this.state.loading) {
  spinner = <Spinner/>
}
  const order = (
    this.state.orders.map(order =>{
      console.log('order', order);
      let ingredients = this.ingredientsToArray(order.ingredients);
      let orderData = this.orderDataToArray(order.orderData);
      if (this.ingredientsToArray(order.ingredients).length === 0){
         console.log(ingredients.length,'BI');
            console.log(this.ingredientsToArray(order.burgerIngredients));

  return( <Order
    key={order.id}
    ingredients={this.ingredientsToArray(order.burgerIngredients)}
    orderData={this.orderDataToArray(order.orderData)}
    price={order.price}
    />) }  else {
        console.log(this.ingredientsToArray(order.ingredients));
        console.log(ingredients.length,'I');
        return (<Order
        key={order.id}
        orderData={orderData}
        ingredients={ingredients}
        price={order.price}
        />)


      }

}
)
);
  return (
<div className={styles.Orders}>
{spinner}
{order}
</div>
  );
}
}

export default withErrorHandler(Orders, axios);
