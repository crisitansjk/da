import React, { useEffect, useState } from 'react'
import useShowToast from './useShowToast'
import { auth, firestore } from './firebase';
import {doc,setDoc,collection,query,where,getDocs,getDoc} from "firebase/firestore"
import useUserProfileStore from './userProfileStore';

export default function useGetUserProfileByUsername(username) {
  const [isLoading,setIsLoading] = useState(true)
  const showToast = useShowToast()
  const {userProfile,setUserProfile} = useUserProfileStore()
  useEffect(()=>{
    const getUserProfile = async() => {
        setIsLoading(true)
        console.log(username)
        try{
            const q = query(collection(firestore,"users"),where("username","==",username))
            const querySnapshot = await getDocs(q)

            if(!querySnapshot) return setUserProfile(null)
            let userDoc
            querySnapshot.forEach((element) => {
                userDoc = element.data()
                
            });
            setUserProfile(userDoc)
            console.log(userDoc)
            
        }catch(error){
            console.log(error.message)

        }finally{
            setIsLoading(false)
        }
    }
    getUserProfile()
  },[setUserProfile,username,showToast])
  return {isLoading,userProfile}
}
