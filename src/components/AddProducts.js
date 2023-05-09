import React, { useState, useEffect } from 'react'
import { auth, db, storage } from '../FirebaseConfigs/firebase'
import { collection, getDocs, query, where, doc, updateDoc, addDoc } from 'firebase/firestore'
import './AddProducts.css'
import { useNavigate } from 'react-router-dom'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

const AddProducts = () => {

    const [producttitle, setProductTitle] = useState("");
    const [producttype, setProductType] = useState("")
    const [keyspecs, setKeyspecs] = useState("")
    const [description, setDescription] = useState("");
    const [brand, setBrand] = useState("")
    const [customersupport, setCustomersupport] = useState("")
    const [price, setPrice] = useState("")
    const [warranty, setWarranty] = useState("")
    const [productimage, setProductImage] = useState("")


    const navigate = useNavigate()
    const [imageError, setImageError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [uploadError, setUploadError] = useState('');


    function GetCurrentUser() {
        const [user, setUser] = useState(null);
        const usersCollectionRef = collection(db, "users");
        useEffect(() => {
            auth.onAuthStateChanged(userlogged => {
                if (userlogged) {
                    // console.log(userlogged.email)
                    const getUsers = async () => {
                        const q = query(usersCollectionRef, where("uid", "==", userlogged.uid));
                        console.log(q);
                        const data = await getDocs(q);
                        setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
                    };
                    getUsers();
                }
                else {
                    setUser(null);
                }
            })
        }, [])
        return user
    }
    
    const loggedUser = GetCurrentUser();
    // if (loggedUser) { console.log(loggedUser[0].email) }
    
    const types = ['image/jpg', 'image/jpeg', 'image/png', 'image/PNG']
    const handleProductImg = (e) =>{
        e.preventDefault();
        let selectedFile = e.target.files[0]

        if(selectedFile) {
            if (selectedFile && types.includes(selectedFile.type)) {
                setProductImage(selectedFile);
                setImageError('');

            }
            else {
                setProductImage(null);
                setImageError('please select a valid image file type(png or jpg)')
            }
        }
        else{
            setImageError("Please select an Image first")
        }
    }

    const handleAddProduct =(e) =>{
        e.preventDefault();
        const storageREf = ref(storage, `product-images${producttype.toUpperCase()}/${Date.now()}`)
        // console.log(storageREf._location.path)
        uploadBytes(storageREf,productimage)
            .then(()=>{
                getDownloadURL(storageREf).then(url=>{
                    addDoc(collection(db, `products-${producttype.toUpperCase()}`), {
                        producttitle,
                        producttype,
                        description,
                        brand,
                        customersupport,
                        price,
                        warranty,
                        productimage: url,
                        keyspecs: keyspecs
                    }).then(() => {
                        setSuccessMsg('Product added successfully');
                        setBrand(" ");
                        setCustomersupport(" ");
                        setDescription(" ");
                        setKeyspecs(" ");
                        setPrice(" ")
                        setProductImage(" ");
                        setProductTitle(" ");
                        setProductType(" ");

                    }).catch((error) => { setUploadError(error.message) });
                })
            })
        
    }

    
  return (
    <div className='addprod-container'>
      {
        loggedUser && loggedUser[0].email === "sample@gmail.com" ?
        <div>
            <form action="" className='addprod-form' onSubmit= {handleAddProduct}>
                <p>Add Products</p>
                {
                    successMsg && 
                        <>
                            <div className="success-msg">
                                {successMsg}
                            </div>
                        </>
                }
                {
                    uploadError && 
                        <>
                            <div className="error-msg">
                                {uploadError}
                            </div>
                        </>
                }
                <label htmlFor="">Product Title</label>
                <input type="text" placeholder='Add Product Title' onChange={(e)=>{setProductTitle(e.target.value)}}/>
                <label>Product Type</label>
                <input onChange={(e) => setProductType(e.target.value)} type="text" placeholder="Product Type" />
                <label>Brand Name </label>
                <input onChange={(e) => setBrand(e.target.value)} type="text" placeholder="Brand Name" />
                <label>warranty</label>
                <input onChange={(e) => setWarranty(e.target.value)} type="text" placeholder="Product Warranty" />
                <label>Image</label>
                <input onChange={handleProductImg} type="file" />
                {imageError && <>
                    <div className='error-msg'>{imageError}</div>
                </>}
                <label>Key Specifications</label>
                <textarea onChange={(e) => setKeyspecs(e.target.value)} placeholder="Enter some key specifications"></textarea>

                <label>Description</label>
                <textarea onChange={(e) => setDescription(e.target.value)} placeholder="Describe your Product in breif"></textarea>
                <label>Price Without Tax -</label>
                <input onChange={(e) => setPrice(e.target.value)} type="text" placeholder="Enter Price without tax" />
                <label>Customer Support</label>
                <input onChange={(e) => setCustomersupport(e.target.value)} type="text" placeholder="Customer Support Email, Phone or address" />

                <button type='submit'>Add</button>
            </form>
        </div> 
        : <div> You cannot access this page. If you should then please contact the administrators</div>
      }
    </div>
  )
}

export default AddProducts
