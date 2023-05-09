import React, { useEffect, useState } from 'react'
import "./Allproductpage.css"
import {
    collection,
    query,
    onSnapshot, getDocs
} from "firebase/firestore";
import { db } from "../../FirebaseConfigs/firebase";
import ProductContainer from './ProductContainer';



const Allproductpage = (props) => {

    const [products,setProducts] = useState([]);
    
    useEffect(()=>{
        const getProducts = ()=>{
            const productsArray = [];

            const path = `products-${props.type.toUpperCase()}`
            console.log(path);

            getDocs(collection(db,path))
            .then((querySnapshot)=>{
                querySnapshot.forEach((doc)=>{
                    productsArray.push({...doc.data(), id:doc.id})
                    console.log(doc.id, " =>", doc.data())
                })
                setProducts(productsArray);
            }).catch((error)=>{
                console.error(error.message)
            })
        }
        getProducts();
    },[])

    // console.log(products)

  return (
    <div className='allproductpage'>
      <div className="heading">
        <p>Top Results for {props.type}</p>
      </div>
      <div className='allproductcontainer'>
        {
            products.map((product)=>(
                <ProductContainer
                key = {product.id}
                product = {product}
                />
            ))
        }
      </div>
    </div>
  )
}

export default Allproductpage
