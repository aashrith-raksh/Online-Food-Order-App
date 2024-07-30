import Modal from "./UI/Modal";
import Button from "./UI/Button";
import { useContext } from "react";
import { CartContext } from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
import CartItem from "./CartItem";

export default function Cart() {
  const ctxValue = useContext(CartContext);

  const { progress, hideCart, showCheckout } = useContext(UserProgressContext);

  const totalCartPrice = ctxValue.items.reduce(
    (totalPrice, item) => totalPrice + item.price * item.quantity,
    0
  );

  function handleGoToCheckout() {
    showCheckout();
  }
  function handleClose() {
    hideCart();
  }

  return (
    <Modal
      className="cart"
      open={progress === "cart"}
      onCloseHandler={progress === "cart" ? handleClose : null}
    >
      <h2>Your Cart</h2>
      <ul>
        {ctxValue.items.map((item) => (
          <CartItem
            key={item.id}
            {...item}
            onIncrease={() => ctxValue.addItem(item)}
            onDecrease={() => ctxValue.removeItem(item.id)}
          ></CartItem>
        ))}
      </ul>
      <p className="cart-total">Total Price: {totalCartPrice}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleClose}>
          Close
        </Button>
        {totalCartPrice > 0 && (
          <Button onClick={handleGoToCheckout}>Checkout</Button>
        )}
      </p>
    </Modal>
  );
}