import React,{useContext} from 'react'
import { shopContext } from '../../context/ShopContextProvider'
import "./cart.css"

const CartItem = ({data}) => {
  const {id, productName, price, productImage} = data;
  const {cartItems, addToCart, removeFromCart, getTotalAmount}= useContext(shopContext)

  return (
    <div className = "cartItem">
        <div className="content">
            <img src={productImage} alt={id} />
            <div className = "inner">
                <p>{productName}</p>
                <p className = "price">{price * cartItems[id]}$</p>
              <div className="countHandler">
                <button onClick={(e) => removeFromCart(id)}> - </button>
                <input value={cartItems[id] }  />
                <button className = "add" onClick={(e) => addToCart(id)} > + </button>
              </div>
            </div>
           
        </div>
    </div>
  )
}

export default CartItem
