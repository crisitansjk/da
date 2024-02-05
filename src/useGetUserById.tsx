import React, { useEffect, useState } from 'react'
import { firestore } from './firebase'
import useShowToast from './useShowToast'
import { arrayUnion, doc, getDoc } from "firebase/firestore";
const useGetUserById = (comment) => {
    const [isLoading,setIsLoading] = useState(false)
    const showToast = useShowToast()
    const userId = comment
    const [userProfiles,setUserProfile] = useState(null)


    useEffect(()=>{
       
        const handleGetUserById = async() => {
            setIsLoading(true)
            setUserProfile(null)
        try{
            const q = await getDoc(doc(firestore,"users",userId))
            if(q.exists()){
                setUserProfile(q.data())
            }
        
            

        }catch(error){
            showToast("Error","Load data is not working","error")

        }finally{
            setIsLoading(false)

        }
    }
    handleGetUserById()
    },[comment,setUserProfile,showToast])

    return {userProfiles,isLoading}
  
}

export default useGetUserById