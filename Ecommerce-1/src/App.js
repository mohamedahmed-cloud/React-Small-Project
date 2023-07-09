import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navbar from './component/navbar'
import Cart from './pages/cart/Cart'
import Shop from './pages/shop/Shop'
import ShopContextProvider from './context/ShopContextProvider'

const App = () => {
  return (
    <div >
      <ShopContextProvider>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element= {<Shop />}/>
              <Route path = "/cart" element = {<Cart />} />
            </Routes>
          </Router>
        </ShopContextProvider>
    </div>
  )
}

export default App
