import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import styles from './BurgerBuilder.module.css';

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 1,
  cheese: 0.2,
  meat: 2

}

class BurgerBuilder extends Component{
  state = {
    ingredients:{
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,

    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
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
    const updatedCount = this.state.ingredients[type] +1;
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const newPrice= this.state.totalPrice + priceAddition;
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
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
      this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
      this.checkPurchasablity(updatedIngredients);
          console.log('purchasable?',this.state.purchasable);

    }

  }
roundedHandler = (totalPrice) => {
const totalPriceRounded = totalPrice.toFixed(2);
console.log("Total price:",totalPriceRounded);
return totalPriceRounded;

}

purchaseHandler = () => {

  this.setState({purchasing: true})
console.log('purchasing?',this.state.purchasing);
}

purchaseCancelHandler = () => {
  this.setState({purchasing: false});
}

purchaseContinueHandler = () => {
  alert('continuing');
}



  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0

    }

    console.log('BurgerBuilder');
    return(
      <>

      <Modal
  show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}
      >
      <OrderSummary
      ingredients={this.state.ingredients}
      purchaseCancelled={this.purchaseCancelHandler}
      purchaseContinued={this.purchaseContinueHandler}
      price={this.roundedHandler(this.state.totalPrice)}

       />
      </Modal>
      <Burger ingredients={this.state.ingredients}/>
      <p className={styles.Price}>Price: {this.roundedHandler(this.state.totalPrice)}</p>
      <BuildControls
      ingredientRemoved={this.removeIngredientHandler}
      ingredientAdded={this.addIngredientHandler}
      disabled={disabledInfo}
      purchasable={this.state.purchasable}
      ordered={this.purchaseHandler}

      />

      </>
    )

  }

}
export default BurgerBuilder;
