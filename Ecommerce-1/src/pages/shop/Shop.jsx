import React from 'react'
import {Products} from '../../Products.js'
import Product from './Product';
const Shop = () => {
  return (
    <div>
        <div className = "shop-name">
            <h2>PedroTech Shop</h2>
        </div>
        <div className="product">
            {Products.map((e) => <Product data = {e} key={(e.id)}/>)}
        </div>
    </div>
  )
}

export default Shop
