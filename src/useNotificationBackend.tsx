
import { firestore } from './firebase'
import { arrayUnion,arrayRemove, doc,getDoc,updateDoc} from "firebase/firestore";
import useAuthStore from './AuthStore';



export default function useNotificationBackend() {
    const authUser = useAuthStore(state=>state.user)
    const setAuthUser = useAuthStore(state=>state.setUser)

    const aba = async(id,user) => {
        console.log(user)
        if(user && id){
        const daa = await doc(firestore,"users",user.uid)
      
        await updateDoc(daa,{notification:arrayUnion(id)})}
    }

    const get = async(item)=>{
        console.log(item)
       
        
   

        const sortUserFriendss=  await doc(firestore,"message",item)
        const docSnapp = await getDoc(sortUserFriendss);

        

        const d = docSnapp.data().conversation.reverse()

        
      
        
        d[0].seen = true
        d.reverse()

        updateDoc(sortUserFriendss,{conversation:[...d]})
       
        
        

      



            
            
        
      

    }

    const deletee = async(id,user) => {
        console.log(user)
        const daa = await doc(firestore,"users",user)
        setAuthUser(daa,{notification:arrayRemove(id)})
        localStorage.setItem("user-info",JSON.stringify({...authUser,notification:authUser.notification.filter(item=>item !== id)}))
        
      
        await updateDoc(daa,{notification:arrayRemove(id)})
    }
   
return{aba,get,deletee}
}
