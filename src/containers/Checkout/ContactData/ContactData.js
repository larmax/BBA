import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner';
import styles from './ContactData.module.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
class ContactData extends Component {
  state = {
    orderForm:{
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Full Name',
        },
        value: '',
        validation: {
        required: true},
        valid: false,
        touched: false,
      },
      street:{
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street',
        },
        value: '',
        validation: {
        required: true},
        valid: false,
        touched: false,
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zip / postal code',
        },
        value: '',
        validation: {
        required: true,
        minLength: 5,
        maxLength: 12,
      }
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country',
        },
        value: '',
        validation: {
        required: true},
        valid: false,
        touched: false,
      },

      email: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Email adress',
        },
        value: '',
        validation: {
        required: true},
        valid: false,
        touched: false,
      },

      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'Cheapest', displayValue: 'Cheapest' },
          {value: 'Fastest', displayValue: 'Fastest' }
        ],
      },
      value: 'Fastest',
      valid: 'true'

    },
  },

  loading: false,
  FormValid: false,

}

checkValidity(value, rules){
  let isValid = true  ;

  if(rules.required){
    isValid = value.trim()  !== '' && isValid;
    console.log(isValid);
  }


if (rules.maxLength) {
  isValid = value.length <= rules.maxLength && isValid;
console.log(isValid);
}
if (rules.minLength) {
  isValid = value.length >= rules.minLength && isValid;
console.log(isValid);
}

  return isValid;
}
orderHandler = ( event ) => {
  event.preventDefault();
  console.log('ContactData ingredients:',this.props.ingredients);
  // alert('continuing');
  this.setState( { loading: true } );
  console.log('loading?',this.state.loading);

const orderForm = {};


for (let id in this.state.orderForm) {
  orderForm[id] = this.state.orderForm[id].value

}


  const order = {
    ingredients: this.props.ingredients,
    price: this.props.price,
    orderData: orderForm,

  }

  axios.post('/orders.json ', order)

  .then (response => {
    console.log('posting', order);
    this.setState({loading: false });
    this.props.history.push("/");
    console.log('pushing back to /');
    console.log('axios post response:',response,'loading:',this.state.loading)})

    .catch (error => {
      this.setState( {loading: false } );

      alert('something went wrong :(');
      console.log('axios post error:',error,'loading:',this.state.loading)});

    }

    inputChangedHandler = (event, inputIdentifier) => {
      const updatedOrderForm = {
        ...this.state.orderForm
      };
      const updatedFormElement = {
        ...updatedOrderForm[inputIdentifier]
      }

      updatedFormElement.value = event.target.value;
            updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation ? updatedFormElement.validation: 'rule' );
            console.log('validity:',    this.state.orderForm);
              updatedFormElement.touched = true;

      updatedOrderForm[inputIdentifier] = updatedFormElement;


console.log('uPFE valid', updatedFormElement.valid);
// if (updatedFormElement.valid ) {
//   this.setState({FormValid: formIsValid})
let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({orderForm: updatedOrderForm, FormValid: formIsValid});
        console.log('FormValid',this.state.FormValid);


    }
    render () {
      const formElementsArr = [];

      for (let key in this.state.orderForm) {
        formElementsArr.push({
          id: key,
          config: this.state.orderForm[key]
        }
      )}

      if (this.state.loading) {
        return <Spinner/>;
      }else {
        return (

          <div className={styles.ContactData}>

          <h4> Enter your contact data </h4>


          <form onSubmit={this.orderHandler}>
          {formElementsArr.map(formElement => (
            <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            changed={(event) => this.inputChangedHandler(event, formElement.id)}
            invalid={!formElement.config.valid && formElement.config.touched}
            touched={formElement.config.touched}
            shouldValidate={formElement.config.validation}
/>
          ))}
            <Button btnType="Success" disabled={!this.state.FormValid}>ORDER</Button>
          </form>
          </div>

        );
      }



    };

  }
  export default ContactData
