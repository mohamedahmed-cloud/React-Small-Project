import './App.css';
import Register from './Pages/Register/Register';
import Login from './Pages/Login/Login'
import Home from './Pages/Home/Home';
import Navbar from './Components/Navbar/Navbar';
import About from './Pages/About/About';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Footer from './Components/Footer/Footer'
function App() {
    


  return (
    <div>
          <Router>
          <Navbar/>
            <Routes>
              <Route path="/" element= {<Home />}/>
              <Route path = "/register" element = {<Register />} />
              <Route path = "/login" element = {<Login />} />
              <Route path = "/about" element = {<About />} />
            </Routes>
          </Router>
          <Footer />
    </div>
  );
}

export default App;
