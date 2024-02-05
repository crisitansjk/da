import React from 'react'
import {Avatar,Container,Flex,VStack,Box,Image,Input,Button,Text,Link,Tooltip} from '@chakra-ui/react'
import {Link as RouterLink } from "react-router-dom"
import { RiLogoutBoxLine } from "react-icons/ri";
import { auth } from './firebase';
import useShowToast from './useShowToast';
import {useSignOut} from "react-firebase-hooks/auth"
import useAuthStore from './AuthStore';


export default function UseLogOut() {
    const [signOut,isLoggingOut,error] = useSignOut(auth)
    const showToast = useShowToast()
    const logoutUser = useAuthStore(state => state.logout)
    const handleLogOut = async () => {
        try{
            await signOut()
            localStorage.removeItem("user-info")
            showToast("Succesfully","","success")
            logoutUser()
        }catch(error){
            showToast("Error",error.message,"error")
        }
    }
  return {handleLogOut,isLoggingOut,error}
}
