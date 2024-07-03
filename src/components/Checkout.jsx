import { useContext } from "react";
import Button from "./UI/Button";
import Input from "./UI/Input";
import Modal from "./UI/Modal";
import UserProgressContext from "../store/UserProgressContext";
import { CartContext } from "../store/CartContext";
import useFetch from "./hooks/useFetch";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const { progress, hideCheckout } = useContext(UserProgressContext);
  const ctxValue = useContext(CartContext);

  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
  } = useFetch("http://localhost:3000/orders", [], requestConfig);

  const totalCartPrice = ctxValue.items.reduce(
    (totalPrice, item) => totalPrice + item.price * item.quantity,
    0
  );

  function handleClose() {
    console.log("handle close called from checkout");
    hideCheckout();
  }

  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());

    sendRequest(
      JSON.stringify({
        order: {
          items: ctxValue.items,
          customer: customerData,
        },
      })
    );
  }

  let actions = (
    <>
      <div className="modal-actions">
        <Button type="button" textOnly onClick={handleClose}>
          Close
        </Button>
        <Button>Submit</Button>
      </div>
    </>
  );

  if (isSending) {
    actions = <p className="center">Sending order request</p>
  }

  if(isSending && error){
    actions = <p className="center">{error}</p>

  }

  return (
    <Modal
      open={progress === "checkout"}
      onCloseHandler={progress === "cart" ? handleClose : null}
    >
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {totalCartPrice}</p>

        <Input label="Full Name" type="text" id="name" />
        <Input label="Email" type="email" id="email" />
        <Input label="Street" type="text" id="street" />

        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>

        {actions}
      </form>
    </Modal>
  );
}
