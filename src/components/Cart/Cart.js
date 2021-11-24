import { useContext, useState, Fragment } from "react";
import CartContext from "../../store/cart-context";
import useHttp from "../../hooks/use-http";
import Modal from "../UI/Modal/Modal";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import classes from "./Cart.module.css";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const { isLoading, sendRequest: sendOrder } = useHttp();
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0 ? true : false;

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({
      ...item,
      amount: 1
    });
  };

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const checkoutOrderHandler = () => {
    setIsCheckout(true);
  };

  const confirmHandler = (userData) => {
    sendOrder(
      {
        url: "https://react-http-14311-default-rtdb.firebaseio.com/orders.json",
        method: "POST",
        body: {
          userData,
          orderItems: cartCtx.items
        },
        headers: {
          "Content-Type": "application/json"
        }
      },
      () => {
        cartCtx.clearCart();
        setOrderSubmitted(true);
      }
    );
  };

  const cartItems = cartCtx.items.map((item) => {
    return (
      <CartItem
        key={item.id}
        name={item.name}
        price={item.price}
        amount={item.amount}
        onRemove={cartItemRemoveHandler.bind(null, item.id)}
        onAdd={cartItemAddHandler.bind(null, item)}
      />
    );
  });

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onCloseCart}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={checkoutOrderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const modalContent = (
    <Fragment>
      <ul className={classes["cart-items"]}>{cartItems}</ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={confirmHandler} onCancel={props.onCloseCart} />
      )}
      {!isCheckout && modalActions}
    </Fragment>
  );

  const confirmedOrderContent = (
    <Fragment>
      <p>Order successfuly sent.</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onCloseCart}>
          Close
        </button>
      </div>
    </Fragment>
  );

  return (
    <Modal onClose={props.onCloseCart}>
      {!isLoading && !orderSubmitted && modalContent}
      {isLoading && <p>Sending order...</p>}
      {orderSubmitted && confirmedOrderContent}
    </Modal>
  );
};

export default Cart;
