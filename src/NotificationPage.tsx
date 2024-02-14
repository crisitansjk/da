import  {  useState } from 'react'
import useGetNott from './useGetNott'
import useNotificationBackend from './useNotificationBackend'
import {Flex,Box,Avatar,Text,Button} from '@chakra-ui/react'
import useAuthStore from './AuthStore'


function NotificationPage(e) {
 
    const {get,deletee} = useNotificationBackend()
    const [active,setActive] = useState(false)
    const authUser = useAuthStore(state=>state.user)

    
    const {masina} = useGetNott()

   
  
   
  
console.log(masina)


 
  return (
    
    
   
    
    
   <Flex direction={"column"} w={"full"} h={"full"} gap={5} m={10} align={"center"}>
    
    
    <Button onClick={()=>setActive(!active)} w={"full"} gap={3} m={3}>Get Notification {authUser.notification.length > 0 && <Box bg={"red.500"} width={5} borderRadius={"50%"}>{authUser.notification.length}</Box>}</Button>
    {active && masina && masina.map((item)=>{
       
        return(
            <Flex cursor={"pointer"} onClick={async()=>{await deletee(item.messageUid,item.expeditor),window.location.reload()}}  m={3} borderBottom="1px" borderColor="white" direction={"column"} w={"full"} transition={"0.5s"} _hover={{borderBottom:"1px",borderColor:"blue.500"}} gap={2}>
                <Box display={"flex"} direction={"row"} gap={3}><Avatar size={"xs"} src={item.creatorImg}/><Text fontWeight={"bold"} fontSize={"3sm"}> {item.creatorName}</Text></Box>
                <Box display={"flex"} direction={"column"} gap={1}><Text fontWeight={"bold"}>Message:</Text><Text>{item.text}</Text> </Box>
                <Button onClick={()=>get(item.messageUid)} bg={"transparent"} color={"gray.500"} size={"sm"} _hover={{color:"gray.400",bg:"gray.900"}} >I see</Button>

             
               
               
            </Flex>
            
        )
    })}
    </Flex>

    
    
  )
}

export default NotificationPage