import classes from './Checkout.module.css';
import useInput from '../Hooks/useInput';

const textCheck = (value) => value.trim().length !== 0
const Checkout = (props) => {
    const {enteredValue: enteredName, isValid: nameIsValid, valueChangeHandler: nameChangeHandler, onBlurHandler: nameBlurHandler, hasError: nameHasError, reset: resetName} = useInput(textCheck)
    const {enteredValue: enteredStreet, isValid: streetIsValid, valueChangeHandler: streetChangeHandler, onBlurHandler: streetBlurHandler, hasError: streetHasError, reset: resetStreet} = useInput(textCheck)
    const {enteredValue: enteredPostCode, isValid: postCodeIsValid, valueChangeHandler: postCodeChangeHandler, onBlurHandler: postCodeBlurHandler, hasError: postCodeHasError, reset: resetPostCode} = useInput(textCheck)
    const {enteredValue: enteredCity, isValid: cityIsValid, valueChangeHandler: cityChangeHandler, onBlurHandler: cityBlurHandler, hasError: cityHasError, reset: resetCity} = useInput(textCheck)
 
    const formIsValid = nameIsValid && streetIsValid && postCodeIsValid && cityIsValid
    const confirmHandler = (event) => {
    event.preventDefault();
    if(!formIsValid) return
    if(formIsValid) props.onConfirm({
        name: enteredName,
        city: enteredCity,
        postalCode: enteredPostCode,
        street: enteredStreet
    })
    resetName()
    resetCity()
    resetPostCode()
    resetStreet()
  };


  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={`${classes.control} ${nameHasError && classes.invalid}`}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' onChange={nameChangeHandler} value={enteredName} onBlur={nameBlurHandler}/>
        {nameHasError && <p>Please enter a valid name</p>}
      </div>
      <div className={`${classes.control} ${streetHasError && classes.invalid}`}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' onChange={streetChangeHandler} value={enteredStreet} onBlur={streetBlurHandler}/>
        {streetHasError && <p>Please enter a valid street</p>}
      </div>
      <div className={`${classes.control} ${postCodeHasError && classes.invalid}`}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' onChange={postCodeChangeHandler} value={enteredPostCode}onBlur={postCodeBlurHandler}/>
        {postCodeHasError && <p>Please enter a valid postCode</p>}
      </div>
      <div className={`${classes.control} ${cityHasError && classes.invalid}`}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' onChange={cityChangeHandler} value={enteredCity}onBlur={cityBlurHandler}/>
        {cityHasError && <p>Please enter a valid city</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit} type="submit" disabled={!formIsValid}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;