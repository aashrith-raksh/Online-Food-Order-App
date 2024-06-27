import { useContext } from "react";
import Button from "./UI/Button";
import Input from "./UI/Input";
import Modal from "./UI/Modal";
import UserProgressContext from "../store/UserProgressContext";
import { CartContext } from "../store/CartContext";

export default function Checkout() {
  const { progress, hideCheckout } = useContext(UserProgressContext);
  const ctxValue = useContext(CartContext);

  const totalCartPrice = ctxValue.items.reduce(
    (totalPrice, item) => totalPrice + item.price * item.quantity,
    0
  );

  function handleClose() {
    console.log("handle close called from checkout");
    hideCheckout();
  }

  console.log("progress in Chckout:", progress);

  return (
    <Modal
      open={progress === "checkout"}
      onCloseHandler={progress === "cart" ? handleClose : null}
    >
      <form>
        <h2>Checkout</h2>
        <p>Total Amount: {totalCartPrice}</p>

        <Input label="Full Name" type="text" id="full-name" />
        <Input label="Email" type="email" id="email" />
        <Input label="Street" type="text" id="street" />

        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="email" id="city" />
        </div>

        <div className="modal-actions">
          <Button type="button" textOnly onClick={handleClose}>
            Close
          </Button>
          <Button>Submit</Button>
        </div>
      </form>
    </Modal>
  );
}
