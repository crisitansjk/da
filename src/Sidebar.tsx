
import {Flex,Box,Button,Link,Tooltip} from '@chakra-ui/react'
import {Link as RouterLink } from "react-router-dom"

import { InstagramLogo, InstagramMobileLogo } from './constants.tsx'

import { RiLogoutBoxLine } from "react-icons/ri";
import UseLogOut from './useLogOut';
import SidebarItems from './SidebarItems';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

function Sidebar() {
    const {handleLogOut,isLoggingOut} = UseLogOut()
    const {pathname} = useLocation()

    const [activ,setActive ] = useState(false)


  
 
  return (
    <Box 
    height={"100vh"}
    borderRight={"1px solid"}
    borderColor={"whiteAlpha.300"}
    py={8}
    position={"sticky"}
    top={0}
    left={0}
    px={{base:2,md:4}}>


        <Flex direction={"column"} gap={10} w="full" height={"full"} >
            <Link to={"/"} as={RouterLink} pl={2} display={pathname !== "/Message" ? {base:"none",md:"block"} : "none" } >
                <InstagramLogo/>
            </Link>
            <Link to={"/"} as={RouterLink} p={2} display={pathname !=="/Message" ? {base:"block",md:"none"} :"block" } bordeRadius={6} _hover={{bg:"whiteAlpha.200"}} w={10}>
                <InstagramMobileLogo/>
            </Link>
            <Flex direction={"column"} gap={5} cursor={"pointer"}>
                <SidebarItems actv={activ}/>


            </Flex>
            <Tooltip key="logout"
                    hasArrow
                    label="Log out"
                    placement="right"
                    bordeRadius={6}
                    

                    ml={1}
                    openDelay={500}
                    display={activ ? {base:"none",md:"block"}:{base:"block",md:"none"}}>
                        <Flex display={"flex"}
                        onClick={handleLogOut}
                        to={"/auth"}
                        as={RouterLink}
                        alignItems={"center"}
                        gap={4}
                        _hover={{bg:"whiteAlpha.400",color:"white",borderRadius:"10px"}}
                        bordeRadius={6}
                        p={2}
                        w={{base:10,md:"full"}}
                        justifyContent={{base:"center",md:"flex-start"}}
                        mt={"auto"}>
                        <RiLogoutBoxLine/>
                        <Button display={pathname !=="/Message" ? {base:"none",md:"block"}:"none"}
                        variant={"ghost"}
                        _hover={"transparent"}
                        size={"s"}
                        isLoading={isLoggingOut}>"Logout"</Button>
                        </Flex>

                    </Tooltip>
        </Flex>

    </Box>

  )
}

export default Sidebar