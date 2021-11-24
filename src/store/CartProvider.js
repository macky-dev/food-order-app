import { useReducer } from "react";
import CartContext from "./cart-context";

const cartDefaultState = {
  items: [],
  totalAmount: 0
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    const foundItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const foundItem = state.items[foundItemIndex];
    let updatedItems;
    if (foundItem) {
      const updatedItem = {
        ...foundItem,
        amount: foundItem.amount + action.item.amount
      };
      updatedItems = [...state.items];
      updatedItems[foundItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };
  } else if (action.type === "REMOVE") {
    const foundItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const foundItem = state.items[foundItemIndex];
    const updatedTotalAmount = state.totalAmount - foundItem.price;
    let updatedItems;
    if (foundItem.amount > 1) {
      const updatedItem = {
        ...foundItem,
        amount: foundItem.amount - 1
      };
      updatedItems = [...state.items];
      updatedItems[foundItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };
  } else if (action.type === "CLEAR") {
    return cartDefaultState;
  }
  return cartDefaultState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartState] = useReducer(
    cartReducer,
    cartDefaultState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartState({ type: "ADD", item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartState({ type: "REMOVE", id });
  };

  const clearCartHandler = () => {
    dispatchCartState({ type: "CLEAR" });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
