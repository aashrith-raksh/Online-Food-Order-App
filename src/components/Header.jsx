import { useContext } from "react";
import logo from "../assets/logo.jpg"
import Button from "./UI/Button";
import { CartContext } from "../store/CartContext";

export default function Header() {
  const {items: cartItems} = useContext(CartContext);

  const totalItemsCount = cartItems.reduce((totalItemsCount, item) => {
    return totalItemsCount + item.quantity;
  }, 0);

  return (
    <header id="main-header">
      <div id="title">
        <img src={logo}></img>
        <h1>React Food</h1>
      </div>
      <nav>
      <Button textOnly={true}>Cart({totalItemsCount})</Button>
      </nav>
    </header>
  );
}
