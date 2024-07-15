import { useState } from "react";

import Header from "./components/Header.jsx";
import Shop from "./components/Shop.jsx";
import { DUMMY_PRODUCTS } from "./dummy-products.js";
import Product from "./components/Product.jsx";
import { CartContext, TestContext } from "./store/shopping-cart-context.jsx";
import Test from "./components/Test.jsx";

function App() {
  const [shoppingCart, setShoppingCart] = useState({
    items: [],
  });

  function handleAddItemToCart(id) {
    setShoppingCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items];

      const existingCartItemIndex = updatedItems.findIndex(
        (cartItem) => cartItem.id === id
      );
      const existingCartItem = updatedItems[existingCartItemIndex];

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        const product = DUMMY_PRODUCTS.find((product) => product.id === id);
        updatedItems.push({
          id: id,
          name: product.title,
          price: product.price,
          quantity: 1,
        });
      }

      return {
        items: updatedItems,
      };
    });
  }

  function handleUpdateCartItemQuantity(productId, amount) {
    setShoppingCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items];
      const updatedItemIndex = updatedItems.findIndex(
        (item) => item.id === productId
      );

      const updatedItem = {
        ...updatedItems[updatedItemIndex],
      };

      updatedItem.quantity += amount;

      if (updatedItem.quantity <= 0) {
        updatedItems.splice(updatedItemIndex, 1);
      } else {
        updatedItems[updatedItemIndex] = updatedItem;
      }

      return {
        items: updatedItems,
      };
    });
  }

  let cartCtx = {
    items: shoppingCart.items,
    addItemToCart: handleAddItemToCart,
  };

  console.log("app component");

  const [test, setTest] = useState(1);
  function handleUpdateTestValue() {
    setTest(Math.random());
  }

  return (
    // this value prop is the actual connection to state.
    <>
      <CartContext.Provider value={cartCtx}>
        <Header
          cart={shoppingCart}
          onUpdateCartItemQuantity={handleUpdateCartItemQuantity}
          testStateValue={test}
          updateTestStateValue={handleUpdateTestValue}
        />
        <Shop>
          {DUMMY_PRODUCTS.map((product) => (
            <li key={product.id}>
              <Product {...product} />
            </li>
          ))}
        </Shop>
      </CartContext.Provider>
      {/* A component is re-executed when the value for the context key changes, the values of these context key are generally
       any state value, here it is test state, so here the value of the testing key changes from inside of the test component, so 
       this would trigger the execution of this component so the APP component and all the child components. 
       There is a similar code, inside the Header component initializing the context there and then changing the context key would 
       only trigger the execution the of the Header component and its child components */}
      <TestContext.Provider value={{ testing: test }}>
        <Test testValue={test} updateTheValue={handleUpdateTestValue} />
      </TestContext.Provider>
    </>
  );
}

export default App;
