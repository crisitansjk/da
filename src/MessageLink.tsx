
import { CommentLogo } from './constants'
import {Flex,Box,Link} from '@chakra-ui/react'
import {Link as RouterLink} from "react-router-dom"
import { useLocation } from 'react-router-dom';
export default function MessageLink({actv}) {
    const {pathname} = useLocation()
  return (
    <>
    <Flex label="Message">
        
      <Link display={"flex"}
      label="Message"
        to={"Message"}
        as={RouterLink}
        alignItems={"center"}
        gap={4}
        _hover={{bg:"whiteAlpha.400",color:"white",borderRadius:"10px"}}
        bordeRadius={6}
        p={2}
        w={{base:10,md:"full"}}
        justifyContent={{base:"center",md:"flex-start"}}>
        <CommentLogo/>
        <Box display={pathname !== "/Message" ? {base:"none",md:"block"}:"none"}>Notification</Box>
        </Link>
    </Flex>
    
    
    </>
   
  )
}
