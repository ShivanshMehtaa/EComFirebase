import React from 'react'
import "./ProductContainer.css"
import { Link } from 'react-router-dom'

const ProductContainer = (product) => {
    let p =product.product
    console.log(p)
    let overalltax = 10/100;
    let overallcomission = 10/100;
    let extraforfunds = 10/100;
    
    let mrp = parseInt(p.price);
    mrp = mrp+overalltax*mrp + overallcomission*mrp + extraforfunds*mrp;
    const salePrice = mrp - extraforfunds*mrp;
    let discount = mrp - salePrice;



  return (
    <div className='product-container'>
        <img src={p.productimage} alt="" />
        <div className='product-details'>
            <a href={`/product/${p.producttype}/${p.id}`}>
                        <button className='producttitle'>{p.producttitle}</button>
            </a>
            <div className="price-container">
                <p className='mrp'>MRP : <p className='rate'>₹{mrp}</p></p>
                <p className='saleprice'>Discount Price : <p className='rate'>₹{salePrice}</p></p>
                <p className='yousave'>You Saved : <p className='rate'>₹{discount}</p></p>

            </div>
            <Link to={`/product/${p.producttype}/${p.id}`}>
                <button className='showmore-btn'>More Details &gt;</button>
            </Link>
        </div>
    </div>
  )
}

export default ProductContainer
