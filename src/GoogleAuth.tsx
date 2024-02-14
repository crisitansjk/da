
import {Flex,Image,Button,Text} from '@chakra-ui/react'

import {useSignInWithGoogle} from "react-firebase-hooks/auth"

import useAuthStore from './AuthStore';
import { auth, firestore } from './firebase';
import {doc,setDoc,getDoc} from "firebase/firestore"


export default function GoogleAuth({prefix}) {
  const [signInWithGoogle] = useSignInWithGoogle(auth);

  const loginUser = useAuthStore((state)=>state.login)

  const signWithGoogle = async () => {
    try{
    
      const newUser = await signInWithGoogle()
      const docRef = doc(firestore, "users", newUser.user.uid);
      const docSnap = await getDoc(docRef);
      if(!docSnap.exists()){
        const userDoc = {
          uid:newUser.user.uid,
          email:newUser.user.email,
          username:newUser.user.email.split("@")[0],
          fullname:"Da",
          bio:"",
          profilePicURL:newUser.user.photoURL,
          follower:[],
          following:[],
          posts:[],
          createdAt:Date.now(),
          notification:[],
        }
        await setDoc(doc(firestore,"users",newUser.user.uid),userDoc)
        localStorage.setItem("user-info",JSON.stringify(userDoc))
        loginUser(userDoc)
      }else if(docSnap.exists()){
        localStorage.setItem("user-info",JSON.stringify(docSnap.data()))
        loginUser(docSnap.data())
       

      }


    }catch(error){

    }
  }
  return (
    <>
    <Flex alignItems={"center"} justifyContent={"center"}>
        <Image src="google.png" h={23}/>
        <Text mx="2" color={"blue.500"}> {prefix} whit Google</Text>
    <Button onClick={()=>signWithGoogle()}></Button>
    </Flex>
    </>
  )
}
