import  { useState } from 'react'
import { firestore } from './firebase'
import useShowToast from './useShowToast'
import {collection,getDocs,query,where} from "firebase/firestore"

export default function useSearchUser() {
    const [isLoading,setIsLoading] = useState(false)
    const [user,setUser] = useState(null)
  

    const getUserProfile = async(username) => {
        setIsLoading(true)
        setUser(null)

        try{
            const q = query(collection(firestore,"users"),where("username","==",username))
            const querySnapshot = await getDocs(q)
            if(querySnapshot.empty) return 

            querySnapshot.forEach(element => {
                setUser(element.data())
                
            });

        }catch(error){

            setUser(null)

        }finally{
            setIsLoading(false)
        }

    }
    return {isLoading,user,getUserProfile,setUser}
  
}
