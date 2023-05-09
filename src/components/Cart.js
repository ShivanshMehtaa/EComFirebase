import React, { useState, useEffect } from 'react'

import { auth, db } from '../FirebaseConfigs/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'
import CartCard from './CartCard'
import './Cart.css'

const Cart = () => {

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
  // if(loggedUser){console.log(loggedUser[0])}

  const [cartData, setCartData] = useState([]);
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
      {
        cartData ? 
        <div>
          <div className="cart-head">
            Your Cart Items
          </div>
          <div className="allcartitems">
            {
              cartData.map((item)=>(
                <CartCard
                  key={item.id}
                  itemdata={item}
                />
              
                ))
            }
          </div>
        </div>

        :
        <h1>your cart is empty</h1>
      }
    </div>
  )
}

export default Cart
