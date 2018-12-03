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
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  }

  componentDidMount(){
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
    const updatedCount = this.state.ingredients[type] +1;
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const newPrice= this.state.totalPrice + priceAddition ;
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
      this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
      this.checkPurchasablity(updatedIngredients);
      console.log('purchasable?',this.state.purchasable);

    }

  }
  roundedHandler = (oldPrice) => {
    const PriceRounded = oldPrice.toFixed(2);
    console.log("Total price:",PriceRounded);
    return PriceRounded;

  }

  purchaseHandler = () => {

    this.setState({purchasing: true})
    console.log('purchasing?',this.state.purchasing);
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
    // alert('continuing');
    this.setState( { loading: true } );
    console.log('loading?',this.state.loading);
    const order = {
      ingredients: this.state.instance,
      price: this.roundedHandler(this.state.totalPrice),
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
      burgerIngredients: this.state.ingredients,
    }
    axios.post('/orders.json ', order)
    .then (response => {
      this.setState({loading: false, purchasing: false});
      console.log('axios post response:',response,'loading:',this.state.loading)})

      .catch (error => {
        this.setState( {loading: false, purchasing: false} );
        alert('something went wrong :(');
        console.log('axios post error:',error,'loading:',this.state.loading)});
      }



      render() {
        const disabledInfo = {
          ...this.state.ingredients
        };
        for (let key in disabledInfo) {
          disabledInfo[key] = disabledInfo[key] <= 0

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
        //   burger = <p>Ingredients cannot be loaded!</p>
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
            disabled={disabledInfo}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
            price={this.roundedHandler(this.state.totalPrice)}
            />
            </>);
            orderSummary= (<OrderSummary
              ingredients={this.state.ingredients}
              purchaseCancelled={this.purchaseCancelHandler}
              purchaseContinued={this.purchaseContinueHandler}
              Price={this.roundedHandler(this.state.totalPrice)}

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
