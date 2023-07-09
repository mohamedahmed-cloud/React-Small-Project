import React, {useContext} from 'react'
import './product.css'
import {shopContext} from '../../context/ShopContextProvider';

const Product = ({data}) => {
    const {id, productName, price, productImage} = data;
    const {cartItems, addToCart}= useContext(shopContext)
    const value = cartItems[id]
  return (
    <div className = "product">
        <div className="con">
            <img src={productImage} alt={id} />
            <p>{productName}</p>
            <p className = "price">{price}$</p>
            <p className="card" onClick={(e) => addToCart(id)}>
              Add To Cart {value > 0 && <span>({value})</span>}
              </p>
        </div>
    </div>
  )
}

export default Product
