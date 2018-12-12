import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner';
import styles from './ContactData.module.css';
import axios from '../../../axios-orders';
class ContactData extends Component{
state = {
name:'',
adress:{
street: '',
streetNumber: '',
  zip:'',
},
email:'',
loading: false,
}

orderHandler = ( event ) => {
  event.preventDefault();
  console.log('ContactData ingredients:',this.props.ingredients);
  // alert('continuing');
  this.setState( { loading: true } );
  console.log('loading?',this.state.loading);
  const order = {
    price: this.props.price,
    customer: {
      name: 'Customer McCustomerface',
      adress: {
        street: 'Testikatu 1',
        zipCode: '00100',
        country: 'Finland',
      },
      email: 'customerMcCustomerface@email.com',
    },
    deliveryMethod: 'fastest',
    burgerIngredients: this.props.ingredients,
  }
  axios.post('/orders.json ', order)
  .then (response => {
    this.setState({loading: false });
    this.props.history.push("/");
    console.log('pushing back to /');
    console.log('axios post response:',response,'loading:',this.state.loading)})

    .catch (error => {
      this.setState( {loading: false } );

      alert('something went wrong :(');
      console.log('axios post error:',error,'loading:',this.state.loading)});
}

render () {
    if (this.state.loading) {
return <Spinner/>;
    }else {
      return (

    <div className={styles.ContactData}>

    <h4> Enter your contact data </h4>
    <form>
    <input className={styles.Input} type="text" name="name" placeholder="your name"/>
    <input className={styles.Input} type="text" name="street" placeholder="street"/>
    <input className={styles.Input} type="text" name="streetNumber" placeholder="House number"/>
    <input className={styles.Input} type="text" name="zip" placeholder="zip code"/>
    <input className={styles.Input} type="text" name="email" placeholder="your email"/>
    <Button btnType="Success" clicked={this.orderHandler} > Order </Button>
    </form>
    </div>

      );
    }



};

}
export default ContactData
