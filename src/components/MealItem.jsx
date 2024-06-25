import { useContext } from "react";
import Button from "./UI/Button";
import { CartContext } from "../store/CartContext";

export default function MealItem({ meal }) {
  // console.log("----- MealItem ---------")


  const {items, addItem} = useContext(CartContext)

  function handleAddItemToCart(){
    // console.log("\n\tReceived in MealItem(meal): ", meal)
    addItem(meal);
  }


  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:3000/${meal.image}`}></img>
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">{meal.price}</p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
          <Button onClick={handleAddItemToCart}>Add to Cart</Button>
        </p>
      </article>
    </li>
  );
}
