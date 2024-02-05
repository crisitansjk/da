import React from 'react'
import {Avatar,Container,Flex,VStack,Box,Image,Input,Button,Text,Link,Tooltip} from '@chakra-ui/react'
import {Link as RouterLink } from "react-router-dom"
import { AiFillHome } from "react-icons/ai";
import { InstagramLogo, InstagramMobileLogo } from './constants.tsx'
import { CreatePostLogo, NotificationsLogo,SearchLogo } from './constants.tsx'
import { RiLogoutBoxLine } from "react-icons/ri";
import UseLogOut from './useLogOut';
import SidebarItems from './SidebarItems';

function Sidebar() {
    const {handleLogOut,isLoggingOut,error} = UseLogOut()
    const sidebarItems = [
        {
            icon:<AiFillHome size={"29px"} />,
            text:"Home",
            link:"/"
        },
        {
            icon:<SearchLogo/>,
            text:"Search",
            link:""
        },
        {
            icon:<NotificationsLogo/>,
            text:"Notification",
            link:""
        },
        {
            icon:<CreatePostLogo/>,
            text:"Create",
            link:""
        },
        {
            icon:<Avatar size={"sm"} name="a"/>,
            text:"Profile",
            link:""
        },
    ]
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
            <Link to={"/"} as={RouterLink} pl={2} display={{base:"none",md:"block"}} >
                <InstagramLogo/>
            </Link>
            <Link to={"/"} as={RouterLink} p={2} display={{base:"block",md:"none"}} bordeRadius={6} _hover={{bg:"whiteAlpha.200"}} w={10}>
                <InstagramMobileLogo/>
            </Link>
            <Flex direction={"column"} gap={5} cursor={"pointer"}>
                <SidebarItems/>


            </Flex>
            <Tooltip key="logout"
                    hasArrow
                    label="Log out"
                    placement="right"
                    bordeRadius={6}
                    

                    ml={1}
                    openDelay={500}
                    display={{base:"block",md:"none"}}>
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
                        <Button display={{base:"none",md:"block"}}
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