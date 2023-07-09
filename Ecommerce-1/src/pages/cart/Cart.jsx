import React, { useContext } from 'react'
import { shopContext } from '../../context/ShopContextProvider'
import {Products} from '../../Products'
import CartItem from './CartItem'
import { useNavigate } from 'react-router-dom'

import "./cart.css"


const Cart = () => {
  const {cartItems,getTotalAmount}= useContext(shopContext)
  const navigate = useNavigate()
  let total = getTotalAmount()
  return (
    <div className = "cart">
        <div >
          <h1>Your Cart Items</h1>
        </div>
        <div className="cartItems">
          {Products.map((e) => (cartItems[e.id] > 0 && <CartItem  data= {e}  />))}
        </div>
        {(total > 0) ?
          <div className = "footer">
            <p>{getTotalAmount() > 0  && `Total Price : $${getTotalAmount()}`}</p> 
            <div>
              <button className = "btn1" onClick={() => navigate("/")}>Continue Shopping</button>
              <button className = "btn2">Checkout</button>
            </div> 
         </div> : (<p className = "alternative">Your Shopping Cart is Empty</p>)}   
        
    </div>
  )
}

export default Cart
