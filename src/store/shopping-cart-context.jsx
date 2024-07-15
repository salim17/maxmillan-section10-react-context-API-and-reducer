import { createContext } from "react";

// createContext method returns a React component, hence casing is not camelCase.
export const CartContext = createContext({
  items: [],
});
