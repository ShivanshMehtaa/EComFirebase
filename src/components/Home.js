import React, { useEffect, useState } from 'react'
import Banner from './Banner'
import { auth, db } from '../FirebaseConfigs/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'
import ProductSlider from './CategoryProducts/ProductSlider'
import "./Home.css"

const Home = () => {


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


  return (
    <div>
      <Banner/>
      <div className='slider-head'><p>Limited Time Deals</p></div>
      <ProductSlider type={'Mobile'}/>
      <ProductSlider type={'Laptop'}/>
      <ProductSlider type={'Camera'}/>
      <ProductSlider type={'Shoes'}/>

      {/* <p>{loggedUser?loggedUser[0].email:"Not available"}</p> */}
    </div>
  )
}

export default Home
