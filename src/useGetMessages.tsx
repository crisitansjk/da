import  { useState } from 'react'
import useAuthStore from './AuthStore'
import {collection,query, doc,getDocs,where,} from "firebase/firestore";
import { firestore } from "./firebase";

function useGetMessages(userr) {
    const [datas,setData] = useState(null)

    
    const userAuth = useAuthStore(state=>state.user)
   

    const dumss = async(userr) => {
        setData(null)
        const tot = [userAuth.uid + userr.uid, userr.uid + userAuth.uid ]


    for(let i =0 ;i<=1;i++){
        const t = tot[i]
    try{

        const sortUserFriends=  await query(collection(firestore,"message"),where("createdBy","==",t))
        const docSnap = await getDocs(sortUserFriends);
        docSnap.forEach(async(doca) => {
            const daa = await doc(firestore,"message",doca.id)
            const srt = doca.data().conversation
            setData(srt)
            console.log(srt)
          });

    }catch(error){
        
    }}}
    return {dumss,datas}


}

export default useGetMessages