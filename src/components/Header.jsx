import { useRef, useState } from "react";

import CartModal from "./CartModal.jsx";
import { TestContext } from "../store/shopping-cart-context.jsx";
import Test from "./Test.jsx";

export default function Header({
  cart,
  onUpdateCartItemQuantity,
  testStateValue,
  updateTestStateValue,
}) {
  const modal = useRef();

  const cartQuantity = cart.items.length;

  function handleOpenCartClick() {
    modal.current.open();
  }

  // const [test, setTest] = useState(1);
  // function handleUpdateTestValue() {
  //   setTest(Math.random());
  // }

  let modalActions = <button>Close</button>;

  if (cartQuantity > 0) {
    modalActions = (
      <>
        <button>Close</button>
        <button>Checkout</button>
      </>
    );
  }

  console.log("header component");

  return (
    <>
      <CartModal
        ref={modal}
        cartItems={cart.items}
        onUpdateCartItemQuantity={onUpdateCartItemQuantity}
        title="Your Cart"
        actions={modalActions}
      />
      <header id="main-header">
        <div id="main-title">
          <img src="logo.png" alt="Elegant model" />
          <h1>Elegant Context</h1>
        </div>
        <p>
          <button onClick={handleOpenCartClick}>Cart ({cartQuantity})</button>
        </p>
      </header>
      <TestContext.Provider value={{ testing: testStateValue }}>
        <Test
          testValue={testStateValue}
          updateTheValue={updateTestStateValue}
        />
      </TestContext.Provider>
    </>
  );
}
