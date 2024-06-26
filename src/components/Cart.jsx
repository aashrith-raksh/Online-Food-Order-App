import Modal from "./UI/Modal";
import Button from "./UI/Button";
import { useContext } from "react";
import { CartContext } from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";

export default function Cart() {
  const ctxValue = useContext(CartContext);

  const {progress, hideCart} = useContext(UserProgressContext);

  const totalCartPrice = ctxValue.items.reduce(
    (totalPrice, item) => totalPrice + item.price * item.quantity,
    0
  );
  return (
    <Modal className="cart" open={progress === 'cart'}>
      <h2>Your Cart</h2>
      <ul>
        {ctxValue.items.map((item) => (
          <li key={item.id}>
            {item.price} - {item.quantity}
          </li>
        ))}
      </ul>
      <p className="cart-total">Total Price: {totalCartPrice}</p>
      <p className="modal-actions">
        <Button textOnly onClick={hideCart}>Close</Button>
        <Button>Checkout</Button>
      </p>
    </Modal>
  );
}
