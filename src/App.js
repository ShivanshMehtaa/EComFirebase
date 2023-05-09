import './App.css';
import { BrowserRouter, Routes,Route  } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import PgFOF from './components/PgFOF';
import Cart from './components/Cart';
import Profile from './components/Profile';
import AddProducts from './components/AddProducts';
import Allproductpage from './components/CategoryProducts/Allproductpage';
import Specificproductpage from './components/CategoryProducts/Specificproductpage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/home" element={<Home/>}/>
          <Route exact path="/signup" element={<Signup/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path = "/cart" element={<Cart/>}/>
          <Route exact path = "/userprofile" element={<Profile/>}/>
          <Route exact path = "/sellproduct" element={<AddProducts/>}/>
            <Route exact path="/product-type/mobile" element={<Allproductpage type={'Mobile'} />} />
            <Route exact path="/product-type/laptop" element={<Allproductpage type={'Laptop'} />} />
            <Route exact path="/product-type/camera" element={<Allproductpage type={'Camera'} />} />
            <Route exact path="/product-type/shoes" element={<Allproductpage type={'Shoes'} />} />
            <Route path="/product/:type/:id"  element={<Specificproductpage />} />
            <Route exact path="/cartdata" element={<Cart/>}/>
          <Route exact path="*" element={<PgFOF/>}/>


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
