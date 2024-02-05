import React from 'react'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, firestore } from './firebase';
import {doc,setDoc,collection,query,where,getDocs,getDoc} from "firebase/firestore"
import useAuthStore from './AuthStore';

export default function UseLogin() {
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useSignInWithEmailAndPassword(auth);
    const loginUser = useAuthStore((state) => state.login)
    const login = async(email,password) => {
    
        if(!email && !password){
            return

        }
        try{
            const userCred = await signInWithEmailAndPassword(email,password)
            if(userCred){
                const docRef = doc(firestore,"users",userCred.user.uid)
                const docSnap = await getDoc(docRef)
                localStorage.setItem("user-info",JSON.stringify(docSnap.data()))
                loginUser(docSnap.data())
            }

        }catch(error){
            console.log(error.message)
            
        }

    }
  return {loading,error,login}
}
