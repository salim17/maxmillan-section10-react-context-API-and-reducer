import { createContext } from "react";

// createContext method returns a React component, hence casing is not camelCase.
// Also initialize the context same as the state just for the sake of autocompletion. note this is not the actual state
export const CartContext = createContext({
  items: [],
  addItemToCart: () => {}
});
