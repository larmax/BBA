import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import withErrorHandler from '../../containers/hoc/withErrorHandler/withErrorHandler';


const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 1,
  cheese: 0.2,
  meat: 2

}

class BurgerBuilder extends Component{
  state = {
    ingredients:null,
    totalPrice: 4,
    roundedPrice: 4.00,
    purchasable: false,
    moreDisabled: false,
    purchasing: false,
    loading: false,
    error: false,

  }

  componentDidMount(){
    console.log('[BurgerBuilder.js]',this.props);
    axios.get('https://bbaproject-40c21.firebaseio.com/ingredients.json')
    .then(response => {
      this.setState({ingredients: response.data});
    })
    .catch(error => {    this.setState({error: true});
    console.error('Errori');
  });


}
checkPurchasablity(ingredients) {
  const sum = Object.keys( ingredients )
  .map( igKey => {
    return ingredients[igKey];
  } )
  .reduce( ( sum, el ) => {
    return sum + el;
  }, 0 );
  this.setState( { purchasable: sum > 0 } );
  console.log('purchasable?',this.state.purchasable);
}
addIngredientHandler = (type) => {
  console.log('Adding ingredient');
  let updatedCount = 0;
  let updatedIngredients = {};
  let newPrice = 0;
  console.log('ingredients sizwe',this.state.ingredients[type]);
  if (this.state.ingredients[type]<= 4) {

    updatedCount = this.state.ingredients[type] +1;
    updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    newPrice= this.state.totalPrice + priceAddition ;
    this.setState({totalPrice: newPrice , roundedPrice: newPrice.toFixed(2),ingredients: updatedIngredients});
    this.checkPurchasablity(updatedIngredients);
    console.log('purchasable?',this.state.purchasable);
    console.log('ingredients',this.state.ingredients);
  }else{
    updatedCount = this.state.ingredients[type] +0;
    updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updatedCount;
    newPrice= this.state.totalPrice;
    this.setState({totalPrice: newPrice , ingredients: updatedIngredients});
    this.checkPurchasablity(updatedIngredients);
    console.log('purchasable?',this.state.purchasable);
    console.log('ingredients',this.state.ingredients);
    this.setState({moreDisabled: true})
    console.log('not adadble',this.state.moreDisabled);
  }



  this.setState({totalPrice: newPrice , ingredients: updatedIngredients});
  this.checkPurchasablity(updatedIngredients);
  console.log('purchasable?',this.state.purchasable);

}



removeIngredientHandler = (type) => {
  console.log(this.state.ingredients[type]);
  if (this.state.ingredients[type] > 0) {
    console.log('Removing ingredient');
    const updatedCount = this.state.ingredients[type] -1;
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const newPrice= this.state.totalPrice - priceDeduction;
    this.setState({totalPrice: newPrice, roundedPrice: newPrice.toFixed(2), ingredients: updatedIngredients});
    this.checkPurchasablity(updatedIngredients);
    console.log('purchasable?',this.state.purchasable);

  }

}


purchaseHandler = () => {

  this.setState({purchasing: true})
  console.log('purchasing?',this.state.purchasing);
}

purchaseCancelHandler = () => {
  this.setState({purchasing: false});
}

purchaseContinueHandler = () => {
  const queryParams= [];
  for (var i in this.state.ingredients) {
    queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent( this.state.ingredients[i] ));

  }
  queryParams.push('price=' + this.state.roundedPrice)
  const queryString = queryParams.join('&')


  this.props.history.push({
    pathname: '/checkout',
    search: '?' + queryString


  });
}



render() {
  const lessDisabledInfo = {
    ...this.state.ingredients
  };
  for (let key in lessDisabledInfo) {
    lessDisabledInfo[key] = lessDisabledInfo[key] <= 0

  }
  const moreDisabledInfo = {
    ...this.state.ingredients
  };
  for (let key in lessDisabledInfo) {
    moreDisabledInfo[key] = moreDisabledInfo[key] >= 4

  }

  let orderSummary =  null;
  if (this.state.loading) {
    orderSummary= <Spinner/>;
  }


  // let burger = null;
  // let stateError = this.state.error;
  //     console.log('Error',stateError);
  // if ( stateError === false ) {
  //   console.log('Error',stateError);
  //   console.error('Error:');
  //
  //   burger =  <Spinner />;
  // }else{
  //   burger = <p>Ingredientzs cannot be loaded!</p>
  // }

  let burger = this.state.error ? <p>Ingredients cannot be loaded!</p> : <Spinner />;
  console.log('Error',this.state.Error);
  if (this.state.ingredients) {
    burger =(
      <>
      <Burger ingredients={this.state.ingredients}/>
      <BuildControls
      ingredientRemoved={this.removeIngredientHandler}
      ingredientAdded={this.addIngredientHandler}
      lessDisabled={lessDisabledInfo}
      purchasable={this.state.purchasable}
      moreDisabled={moreDisabledInfo}
      ordered={this.purchaseHandler}
      price={this.state.roundedPrice}
      />
      </>);
      orderSummary= (<OrderSummary
        ingredients={this.state.ingredients}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        Price={this.state.roundedPrice}

        />);
      }
      if (this.state.loading) {
        orderSummary= <Spinner/>;
      }
      console.log('BurgerBuilder');
      return(
        <>
        <Modal
        show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}
        >
        {orderSummary}
        </Modal>
        {burger}

        </>
      )


    }
  }
  export default withErrorHandler(BurgerBuilder, axios  );
