import React from "react";

import { createContext, useContext, useEffect, useState } from "react";

import { app, db } from "./Firebase";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { setDoc, doc, collection } from "firebase/firestore";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithRedirect,
} from "firebase/auth";
import { async } from "regenerator-runtime";


import { ToastContainer, toast } from "react-toastify";

// !creating context

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  let auth = getAuth();
  const API_KEY1 = `62bd0b953b6c4a50a3fff4e27084d94c`
  const API_KEY2 = `7d8e3d34745c4731b1da758cdad1b008`
  const API_KEY3= `2af405af41b84ff6a4b8f0cea79b1c5a`


  // const collectionRef = collection(db, "users")

  const [user, setUser] = useState({});

  function signUp(email, password) {
    createUserWithEmailAndPassword(auth, email, password);
    setDoc(doc(db, "users", email), {
      savedRecipes: [],
    });
  }

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logOut() {
    auth.signOut();
    toast.warn("You have logged out");
  }

  let googleProvider = new GoogleAuthProvider();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      // alert("logged out successfully")
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ signUp, logIn, logOut, user,API_KEY1, API_KEY2,API_KEY3 }}>
      {children}
    </AuthContext.Provider>
  );
};

export function UserAuth() {
  return useContext(AuthContext);
}
