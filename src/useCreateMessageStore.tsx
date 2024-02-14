import  { useState } from 'react'
import { addDoc, arrayUnion, collection,query, doc,getDocs,where,updateDoc } from "firebase/firestore";
import { firestore, storage} from "./firebase";
import useAuthStore from './AuthStore';
import { getDownloadURL, ref, uploadString } from "firebase/storage";

function useCreateMessageStore() {
    const userAuth = useAuthStore(state=>state.user)
    const [exist,setExist] = useState(null)
    
  const handle = async(commTo) => {
    const data = []
    const tot = userAuth.uid + commTo.uid
   
 
    
    const newMess = {
        conversation:[],
        createdBy:tot,
        
    }
    try{
        
        
    
    const sortUserFriends=  await query(collection(firestore,"message"),where("createdBy","==",tot))
    const docSnap = await getDocs(sortUserFriends);

    docSnap.forEach(async(doca) => {

        setExist(doca.id)
     
        
      });

   

    

   




    const da = await getDocs(collection(firestore,"message"))

    da.forEach((doc) => {

        // doc.data() is never undefined for query doc snapshots
        data.push(doc.data().createdBy);
        
      });
    const rev= commTo.uid + userAuth.uid
    const dat = data.find(item=>item == tot || item == rev)
    
  


  

    if(dat != tot && dat != rev){
        await addDoc(collection(firestore,"message"),newMess)

    }else{
        
        
        
    }

    
      
    
    
    
   
    
  

    
    }catch(error){
        console.log(error)

    }
  }

  const clickFu = async(commTo,text,fil) => {
    const tot = [userAuth.uid + commTo.uid,commTo.uid+userAuth.uid]
    let merge = ""
    
   
    
    for(let i =0 ;i<=1;i++){
    const t = tot[i]
    const sortUserFriends=  await query(collection(firestore,"message"),where("createdBy","==",t))
    const docSnap = await getDocs(sortUserFriends);
   
    docSnap.forEach(async(doca) => {
        const daa = await doc(firestore,"message",doca.id)
        setExist(doca.id)

        const conv = {
            text:text,
          
            createdAt:Date.now(),
            expeditor:commTo.uid,
            creatorImg:userAuth.profilePicURL,
            creator:userAuth.uid,
            creatorName:userAuth.username,
            messageUid:doca.id,
            seen:false,
            
          }
     
       
        if(fil){
		    const imageRef = ref(storage, `posts/${conv.createdAt}`);
            await uploadString(imageRef, fil, "data_url");
            const downloadURL = await getDownloadURL(imageRef);
            conv.imageConv = downloadURL
        }
        await updateDoc(daa,{conversation:arrayUnion(conv)})
      });

  }
  

}
  return {handle,clickFu,exist}
}

export default useCreateMessageStore