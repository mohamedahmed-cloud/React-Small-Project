import {Products} from "../Products"
import { createContext, useState } from "react"

export const shopContext = createContext(null)

const getCart= () => {
    const cart = []
    for(let i  = 1; i < Products.length; i ++)
    {
        cart[i] = 0
    }
    return cart
}

const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState(getCart())
    const addToCart = (itemId) => {
        setCartItems((prev) => ({...prev, [itemId] : prev[itemId] + 1}))
    }
    const removeFromCart= (itemId) => {
        setCartItems((prev) => ({...prev,[itemId] : prev[itemId] - 1 }))
    }
    const getTotalAmount = () => {
        let total = 0;
        for (const i of Products){

            if (cartItems[i.id] > 0)
            {
                // console.log(cartItems[i.id]);
                total += cartItems[i.id] * i.price
            }
        }
        return total
    }
    const contextValue= {cartItems, addToCart, removeFromCart, getTotalAmount}
  return (
    <shopContext.Provider value ={contextValue}>
        {props.children}
    </shopContext.Provider>
  )
}

export default ShopContextProvider
