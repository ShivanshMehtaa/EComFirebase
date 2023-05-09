import React, { useState, useEffect } from 'react'
import { auth, db } from '../FirebaseConfigs/firebase'
import { collection, getDocs, query, where, doc, updateDoc } from 'firebase/firestore'
import './Profile.css'

const Profile = () => {
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
  

  return (
    <div>
      <div className="userprofile-outercontainer">
        {
          loggedUser ? <div className='user-profile'>

            <p>Your Account Details - </p>
              <div className='data-row'>
                <span>Your Name </span>
                <span>{loggedUser[0].username}</span>
              </div>
              <div className='data-row'>
                <span>Your Email </span>
                <span>{loggedUser[0].email}</span>
              </div>
              <div className='data-row'>
                <span>Your Phone Number </span>
                <span>{loggedUser[0].phonenumber}</span>
              </div>
              <div className='data-row'>
                <span>Your Address </span>
                <span>{loggedUser[0].address}</span>
              </div>
          </div> : 
          <div>
            You Are Not Currently Logged IN 
          </div>
        }
      </div>
    </div>
  )
}

export default Profile
