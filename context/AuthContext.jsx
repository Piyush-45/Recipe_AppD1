import React from 'react'

import { createContext, useContext, useEffect, useState } from 'react'
 
import { app,db } from './Firebase';
import { getAuth } from 'firebase/auth';
import { setDoc, doc, collection } from 'firebase/firestore';

import {  createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
// import {doc, setDoc} from "firebase/firestore"

// !creating context 


const AuthContext = createContext();

export const AuthContextProvider  = ({children}) => {
    let auth  = getAuth()

    // const collectionRef = collection(db, "users")

    const [user, setUser] = useState({})


    function signUp(email, password) {
            createUserWithEmailAndPassword(auth,email, password);
            setDoc(doc(db, 'users', email),{
            savedRecipes : []
            }
        );
        
    }

    function logIn(email, password){
        return signInWithEmailAndPassword(auth,email, password ) 
        
    }

    function logOut(){
        return signOut(auth)
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser)
            // alert("logged out successfully")
        })
        return ()=>{
            unsubscribe()
        }
    }, []);

  return (
    <AuthContext.Provider value={{signUp, logIn, logOut, user}}>
        {children}
    </AuthContext.Provider>
  )
}

export function UserAuth(){
    return useContext(AuthContext)
}