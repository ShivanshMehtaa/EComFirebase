import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import cartlogo from "../components/assets/cartlogo.png";
import profilelogo from "../components/assets/profilelogo.png";
import { auth, db } from '../FirebaseConfigs/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

  function GetCurrentUser(){
    const [user,setUser] = useState("")
    const usersCollectionRef = collection(db,"users")

    useEffect(()=>{
      auth.onAuthStateChanged(userlogged =>{
        if(userlogged){
          const getUsers = async()=>{
            const q = query(usersCollectionRef,where("uid","==",userlogged.uid))
            // console.log(q)
            const data = await getDocs(q);
            setUser(data.docs.map((doc)=>({
              ...doc.data(),id:doc.id
            })))
          }
          getUsers();
        }
        else{
          setUser(null);
        }
      })
    },[])
    return user
  }

  const loggedUser  =GetCurrentUser();
  if(loggedUser){console.log(loggedUser[0])}

  const navigate = useNavigate();

  const handleLogout = ()=>{
    auth.signOut().then(()=>{
      navigate("/login")
    })
  }

  const[cartData,setCartData]= useState([]) ; 
  if(loggedUser){
    const getcartdata = async () => {
      const cartArray = [];
      const path = `cart-${loggedUser[0].uid}`
      // console.log(path)
      getDocs(collection(db, path)).then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              // console.log(doc.id, " => ", doc.data());
              cartArray.push({ ...doc.data(), id: doc.id })
          });
          setCartData(cartArray)
          // console.log('done')
      }).catch('Error error error')

  }
  getcartdata()
  }








  return (

    <div>
    <div className="navbar">
      <div className="LeftContainer">
        <img src="https://img.freepik.com/premium-vector/online-shopping-logo-design-template-digital-shopping-logo-mouse-cursor-cart-concepts_502185-286.jpg" alt="" />

      </div>
      <div className="RightContainer">
        {
          !loggedUser && <nav>
            <Link to='/' ><button>Home</button></Link>
            <Link to='/signup'><button>Register</button></Link>
            <Link to='/login'><button>Login</button></ Link >
            <div className='cart-btn'>
                <img src={cartlogo} alt="no img" />
                <span className='cart-icon-css'>0</span>
            </div>
            <Link to="/login">
                <img src={profilelogo} className='profile-icon' alt="" />
            </Link>
          </nav>
        }

        {loggedUser && 
          <nav>
            <Link to="/"><button>Home</button></Link>
            <Link to="/sellproduct"><button>Sell</button></Link>
            <div className="cart-btn">
            <Link to='/cartdata'><img src={cartlogo} alt="no img" /></Link>
              <button className="cart-icon-css">{cartData.length}</button>
            </div>
            <Link to="/userprofile">
              <img src={profilelogo} className='profile-icon' alt="no img" />
            </Link>
            <button className='logout-btn' onClick={handleLogout}>Logout</button>
          </nav>
        }
      </div>
    </div>
      <div className="product-types">
      <a href="/product-type/mobile"><button>Mobiles</button></a>
              <a href="/product-type/laptop"><button>Laptops</button></a>
              <a href="/product-type/camera"><button>Cameras</button></a>
              <a href="/product-type/shoes"><button>Shoes</button></a>
      </div>
    </div>
    
  );
};

export default Navbar;
