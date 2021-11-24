import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isNotEmpty = (value) => value.trim() !== "";
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();
  const [formIsValid, setFormIsValid] = useState({
    name: true,
    street: true,
    postal: true,
    city: true
  });

  const submitFormHandler = (event) => {
    event.preventDefault();
    const nameInputIsValid = isNotEmpty(nameInputRef.current.value);
    const streetInputIsValid = isNotEmpty(streetInputRef.current.value);
    const postalInputIsValid = isFiveChars(postalInputRef.current.value);
    const cityInputIsValid = isNotEmpty(cityInputRef.current.value);

    setFormIsValid({
      name: nameInputIsValid,
      street: streetInputIsValid,
      postal: postalInputIsValid,
      city: cityInputIsValid
    });

    if (
      !nameInputIsValid &&
      !streetInputIsValid &&
      !postalInputIsValid &&
      !cityInputIsValid
    ) {
      return;
    }

    props.onConfirm({
      name: nameInputRef.current.value,
      street: streetInputRef.current.value,
      postal: postalInputRef.current.value,
      city: cityInputRef.current.value
    });
  };

  const nameInputClass = `${classes.control} ${
    formIsValid.name ? "" : classes.invalid
  }`;
  const streetInputClass = `${classes.control} ${
    formIsValid.street ? "" : classes.invalid
  }`;
  const postalInputClass = `${classes.control} ${
    formIsValid.postal ? "" : classes.invalid
  }`;
  const cityInputClass = `${classes.control} ${
    formIsValid.city ? "" : classes.invalid
  }`;
  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      <div className={nameInputClass}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formIsValid.name && <p>Please enter a valid name.</p>}
      </div>
      <div className={streetInputClass}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formIsValid.street && <p>Please enter a valid street.</p>}
      </div>
      <div className={postalInputClass}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInputRef} />
        {!formIsValid.postal && (
          <p>Please enter a valid postal (5 characters long).</p>
        )}
      </div>
      <div className={cityInputClass}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formIsValid.city && <p>Please enter a valid city.</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
