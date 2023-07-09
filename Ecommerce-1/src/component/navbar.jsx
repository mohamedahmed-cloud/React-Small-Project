import React from 'react'
import {Link} from 'react-router-dom'
import {ShoppingCart} from 'phosphor-react'
import "./navbar.css"
const navbar = () => {
  return (
    <div className = 'navbar'>
        <div className = "links container">
            <Link to = '/'>Shop</Link>
            <Link to = '/cart'>
                <ShoppingCart />
            </Link>
        </div>
    </div>
  )
}

export default navbar
