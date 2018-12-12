import React,{Component} from 'react';
import { Route} from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import Styles from './Checkout.module.css';
import axios from '../../axios-orders';
import ContactData from './ContactData/ContactData';

class Checkout extends Component{

  state = {
    checkoutIngredients: {},
    ingredientsEmpty: false,
    extras:{},
    error:{},
    fullPrice: '0.00',
    loading: false,

  }
  componentWillMount(){

    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = '0.00';
    for (let param of query.entries()) {
      console.log('queryloop');
      if (param[0] === 'price') {
        price = param[1];
      }else {
        ingredients[param[0]] = +param[1];

      }
      this.setState({checkoutIngredients: ingredients})
      console.log('checkout price', price);
      this.setState({fullPrice: price})

    }
    var result = false;

    for (var i in ingredients) {
      console.log('ingredientloop');
      if (ingredients[i] > 0) {
        result = true;
        break;
      }
    }
    if (!result) {
      console.log('no ingredients!!', ingredients);
      this.setState({ingredientsEmpty: true})
      this.props.history.push("/")
      console.log('going back to BurgerBuilder');
    }else {
      console.log('YES ingredients!!', ingredients);
    }

    console.log('[Checkout.js]',this.props);
    axios.get('https://bbaproject-40c21.firebaseio.com/extras.json')
    .then(response => {
      this.setState({extras: response.data});
    })
    .catch(error => {    this.setState({error: true});
    console.error('Errori');

  });
  console.log('Checkout State',this.state);
}

checkoutContinuedHandler = () => {
  this.props.history.replace('/checkout/contact-data');
  console.log('continuing');
}
checkoutCancelledHandler = () => {

  this.props.history.goBack();
  console.log('goBack');
}



render(){
  console.log('fullPrice',this.state.fullPrice);
  const ingredientSummary = Object.keys( this.state.checkoutIngredients )

  .map( igKey => {
    return (

      <li key={igKey}>
      <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {this.state.checkoutIngredients[igKey]}
      </li>

    );
  } );

  return (
    <div className={ Styles.Summary } >

    <CheckoutSummary
    ingredients={this.state.checkoutIngredients}
    checkoutCancelled={this.checkoutCancelledHandler}
    checkoutContinued={this.checkoutContinuedHandler}
    />

    {ingredientSummary}
    <p>Price: {this.state.fullPrice}</p>

    <Route
    path={this.props.match.path + '/contact-data'}
    render={(props) => (<ContactData ingredients={this.state.checkoutIngredients} price={this.state.fullPrice} {...props} />)} />
    </div>
  );

};

}

export default Checkout;
