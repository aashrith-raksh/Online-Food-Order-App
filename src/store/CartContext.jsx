import { createContext, useReducer } from "react";

export const CartContext = createContext({
  items: [],
  addItem: () => {},
  removeItem: () => {},
});

function cartReducer(state, action) {
  if (action.type == "ADD_ITEM") {
    // add or update the exisiting item
    const { item: newItem } = action;
    const exisitingItemsCopy = [...state.items];
    const exisitingItemIndex = exisitingItemsCopy.findIndex(
      (item) => item.id == newItem.id
    );

    if (exisitingItemIndex > -1) {
      const itemToUpdate = exisitingItemsCopy[exisitingItemIndex];
      itemToUpdate.quantity += 1;
    } else {
      exisitingItemsCopy.push({ ...newItem, quantity: 1 });
    }

    const updatedItems = exisitingItemsCopy;

    return { ...state, items: updatedItems };
  }

  if (action.type == "REMOVE_ITEM") {
    // remove
    const { id: inputId } = action;
    const exisitingItemsCopy = [...state.items];

    const exisitingItemIndex = exisitingItemsCopy.findIndex(
      (item) => item.id == inputId
    );

    const exisitingItem = exisitingItemsCopy[exisitingItemIndex];

    if (exisitingItem.quantity === 1) {
      exisitingItemsCopy.splice(exisitingItemIndex, 1);
    } else {
      const updatedItem = {
        ...exisitingItem,
        quantity: exisitingItem.quantity - 1,
      };

      exisitingItemsCopy[exisitingItemIndex] = updatedItem;
    }

    const updatedItems = exisitingItemsCopy;

    return { ...state, items: updatedItems };
  }

  return state;
}

export default function CartContextProvider({ children }) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  function addItem(item) {
    // console.log("------- CartContex ----------")
    // console.log("\n\tRecieverd in addItem(item): ", item)
    dispatchCartAction({ type: "ADD_ITEM", item });
  }
  function removeItem(id) {
    dispatchCartAction({ type: "ADD_ITEM", id });
  }

  const ctxValue = {
    items: cart.items,
    addItem,
    removeItem,
  };

  // console.log("ctxValeu: ", ctxValue);
  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
}
