import React from 'react';
import { commerce } from './lib/commerce'
import { Navbar,Products, Cart, Checkout } from './components'
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {

  const [products,setProduct] = useState([]);
  const [cart,setCart] = useState({});
  const [order,setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  // fetch products form commerce.js backend
  const fetchProducts = async ()=>{
    const { data } = await commerce.products.list();
    setProduct(data);
  }

  const fetchCart = async ()=>{
    setCart(await commerce.cart.retrieve());
  }

  // add products to cart
  const handleAddtoCart = async (productID,qty)=>{
    const { cart } = await commerce.cart.add(productID, qty);
    setCart(cart);
  }

  // update cart contents
  const handleUpdateCartQty = async (productID,qty)=>{
    const { cart } = await commerce.cart.update(productID,{ qty });
    setCart(cart);
  }

  // remove product from cart
  const handleRemoveFromCart = async (productID)=>{
    const { cart } = await commerce.cart.delete(productID);
    setCart(cart);
  }

  // empty cart
  const handleEmptyCart = async()=>{
    const { cart } = await commerce.cart.empty();
    setCart(cart);
  }
  // refresh cart after order is completed
  const refreshCart = async ()=>{
    const newCart = await commerce.cart.refresh();
    setCart(newCart)
  }
  const handleCaptureCheckout = async (checkoutTokenId, newOrder)=>{
    try{
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
      setOrder(incomingOrder)
      refreshCart();
    }catch(error){
      setErrorMessage(error.data.error.message);
    }
  }
  useEffect(()=>{
    fetchProducts();
    fetchCart();
  },[]);
  

  return (
    <Router>
      <div className="App">
        <Navbar totalItems={cart.total_items} />
        <Switch>
          <Route exact path="/">
            <Products products={products} onAddToCart = {handleAddtoCart} />
          </Route>
          <Route exact path="/cart">
            <Cart cart={cart} 
              handleUpdateCartQty={handleUpdateCartQty}
              handleRemoveFromCart={handleRemoveFromCart}
              handleEmptyCart={handleEmptyCart}
            />
          </Route>
          <Route exact path="/checkout">
            <Checkout cart={cart} 
              order={order}
              onCaptureCheckout={handleCaptureCheckout}
              error={errorMessage} 
            />
          </Route>
        </Switch>
      </div>
    </Router>
    
  );
}

export default App;
