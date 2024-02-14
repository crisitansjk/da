import  { useEffect, useState } from 'react'
import useAuthStore from './AuthStore'
import {  doc,getDoc } from "firebase/firestore";
import { firestore } from './firebase';


function  useGetNott(e) {

    const authUser = useAuthStore(state=>state.user)
    const [masina,setMasina] = useState([])
    let da = []

    useEffect(()=>{
        


        if(da.length == 0 && masina.length == 0 && authUser.notification.length > 0){
            try{
                let d = []
                authUser.notification.forEach(async(item)=>{
                  
                    const sortUserFriends=  await doc(firestore,"message",item)
                    const docSnap = await getDoc(sortUserFriends);
                    const srt = docSnap.data().conversation.reverse()[0]
                    d.push(srt)
                    
                  
                   
                   
                    
                    
    
                })
                setMasina(d)
               
                
            }catch(error){

            }
          
            
           
            
        }
      
       
      

     

    },[masina,authUser])
    
        
       


       
            
            
        
       

        


    




    


    return {da,masina}

}

export default useGetNott