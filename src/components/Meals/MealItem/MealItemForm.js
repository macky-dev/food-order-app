import { useRef, useState } from "react";
import Input from "../../UI/Input/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const amountRef = useRef();
  const [amountIsValidState, setAmountIsValidState] = useState(true);

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const amountVal = amountRef.current.value;
    const amountValNumber = +amountVal;

    if (
      amountVal.trim().length === 0 ||
      amountValNumber < 1 ||
      amountValNumber > 5
    ) {
      setAmountIsValidState(false);
      return;
    }

    props.onAddToCart(amountValNumber);
  };

  return (
    <form onSubmit={formSubmitHandler} className={classes.form}>
      <Input
        ref={amountRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1"
        }}
      />
      <button type="submit">+ Add</button>
      {!amountIsValidState && <p>Please enter a valid amount (1-5)</p>}
    </form>
  );
};

export default MealItemForm;
