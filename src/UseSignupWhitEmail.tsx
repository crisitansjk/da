import React from 'react'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from './firebase';
import {doc,setDoc,collection,query,where,getDocs} from "firebase/firestore"
import useShowToast from './useShowToast';
import useAuthStore from './AuthStore';

export default function UseSignupWhitEmail() {
    const [createUserWithEmailAndPassword,user,loading,error] = useCreateUserWithEmailAndPassword(auth)
    const showToast = useShowToast()
    const loginUser = useAuthStore(state => state.login)
    const logoutUser = useAuthStore(state => state.logou)

    const signup = async (email,password,fullName,userName) => {
       
        if(!email || !password || !userName || !fullName){
            showToast("Error","please fill the fields","error")
            
            

        }

        const userRef = collection(firestore, "users");

// Create a query against the collection.
        const q = query(userRef, where("username", "==", userName));

        const querySnapshot = await getDocs(q);
        if(!querySnapshot.empty){
            showToast("Error","Username exist","error")
            
        }
           
        
        try{
            
            const newUser = await createUserWithEmailAndPassword(email,password)
            if(!newUser && error){
                showToast("Error",error,"error")
            }
            if(newUser){
                const userDoc = {
                    uid:newUser.user.uid,
                    email:email,
                    username:userName,
                    fullname:fullName,
                    bio:"",
                    profilePicURL:"",
                    follower:[],
                    following:[],
                    post:[],
                    createdAt:Date.now()
                }
                await setDoc(doc(firestore,"users",newUser.user.uid),userDoc)
                localStorage.setItem("user-info",JSON.stringify(userDoc))
                loginUser(userDoc)
            }
        }catch(error){
            console.log(error.message)
            showToast("Error","","error")
        }
    }
  return {loading,error,signup}
}
