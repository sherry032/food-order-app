import React, { useState, useEffect} from "react"
import Header from "./components/Layout/Header"
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart"
import CartProvider from "./components/store/CartProvider";


function App() {
 
  const [cartModalOn, setCartModalOn] = useState(false)
  const showCartModalHandler = ()=>{
    setCartModalOn(true)
  }
  const closeCartModalHandler = ()=>{
    setCartModalOn(false)
  }

  return (
    <CartProvider>
      {cartModalOn && <Cart closeModal={closeCartModalHandler} />}
      <Header onShowModal={showCartModalHandler}/>
      <main>
        <Meals/>
      </main>
    </CartProvider>
  );
}

export default App;
