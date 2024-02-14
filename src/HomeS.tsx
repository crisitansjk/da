
import {Box,Link,Tooltip} from '@chakra-ui/react'
import {Link as RouterLink } from "react-router-dom"
import { AiFillHome } from "react-icons/ai";
import { useLocation } from 'react-router-dom';


export default function HomeS({actv}) {
  const {pathname} = useLocation()
  return (
    <Tooltip 
                    hasArrow
                    label={"Home"}
                    placement="right"
                    bordeRadius={6}

                    ml={1}
                    openDelay={500}
                    display={{base:"none",md:"block"}}>
                        <Link display={"flex"}
                        to={"/" ||  null}
                        as={RouterLink}
                        alignItems={"center"}
                        gap={4}
                        _hover={{bg:"whiteAlpha.400",color:"white",borderRadius:"10px"}}
                        bordeRadius={6}
                        p={2}
                        w={{base:10,md:"full"}}
                        justifyContent={{base:"center",md:"flex-start"}}>
                        <AiFillHome fontSize={22}/>
                        <Box display={pathname !== "/Message" ? {base:"none",md:"block"}:"none"}>"Home"</Box>
                        </Link>

                    </Tooltip>
  )
}
