
import {Box,Link,Tooltip} from '@chakra-ui/react'
import {Link as RouterLink } from "react-router-dom"
import { NotificationsLogo, NotificationsLogoRed } from './constants'
import { useLocation } from 'react-router-dom';
import useNotificationBackend from './useNotificationBackend';

import useAuthStore from './AuthStore';
import { useEffect, useState } from 'react';
export default  function Notification({actv}) {
  const {get} = useNotificationBackend()
  const authUser = useAuthStore(state=>state.user)
  const [active,setActive] = useState(false)

  const {pathname} = useLocation()

  useEffect(()=>{

    const activationKey = () => {
      try{
        if(authUser){
          setActive(true)
        }
      }
      catch(error){
        console.log(errro)
    }
  }

    activationKey()
   
  },[authUser])



  
 if(active){

  return (
    <Tooltip 
    hasArrow
    label={"Notification"}
    placement="right"
    bordeRadius={6}
    onClick = {()=> get()}

    ml={1}
    openDelay={500}
    display={{base:"none",md:"block"}}>
        <Link display={"flex"}
        to={"/Notification"}
        as={RouterLink}
        alignItems={"center"}
        gap={4}
        _hover={{bg:"whiteAlpha.400",color:"white",borderRadius:"10px"}}
        bordeRadius={6}
        p={2}
        w={{base:10,md:"full"}}
        justifyContent={{base:"center",md:"flex-start"}}>
        {authUser.notification.length > 0 ? <NotificationsLogoRed/>:<NotificationsLogo />}
        <Box display={pathname !== "/Message" ? {base:"none",md:"flex"}:"none"}  direction={"row"} gap={2}>Notification {authUser.notification.length > 0 &&  <Box bg={"red.500"} w={6} borderRadius={"50%"} justify={"center"} align={"center"} gap={0}>{authUser.notification.length}</Box>}</Box>
        </Link>

    </Tooltip>

  )
 }
}
