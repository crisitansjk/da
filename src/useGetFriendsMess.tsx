import  { useEffect, useState } from 'react'
import useAuthStore from './AuthStore'

import {  doc, getDoc } from "firebase/firestore";
import { firestore } from './firebase';

function useGetFriendsMess() {
    const [friendClient,setFriendClient] = useState(null)
    const authUser = useAuthStore((state) => state.user)
  

  useEffect((e)=>{


    const getFriends = async() => {
  
     

        try{

            const dataFriendsFromClient = []
            
            const sortUserFriends = authUser.following.filter((userElement)=> userElement !== authUser.uid)

            sortUserFriends.forEach(async(friendsElement)=>{
   
                const querryFriends = await getDoc(doc(firestore,"users",friendsElement))

            if(querryFriends.exists()){

                dataFriendsFromClient.push(querryFriends.data())
                return querryFriends.data()

            }})

            setFriendClient(dataFriendsFromClient)
          

        }catch(error){
    
        }
      }
       if(!friendClient) getFriends()

      ,[friendClient,authUser,setFriendClient,getFriends]})

  return {friendClient}

}

export default useGetFriendsMess