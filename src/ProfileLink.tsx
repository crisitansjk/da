import React from 'react'
import useAuthStore from './AuthStore'
import {Avatar,Container,Flex,VStack,Box,Image,Input,Button,Text,Link,Tooltip} from '@chakra-ui/react'
import {Link as RouterLink } from "react-router-dom"

export default function ProfileLink() {
    const authUser = useAuthStore((state)=>state.user)
  return (
    <Tooltip
    hasArrow
    label={"Profile"}
    placement="right"
    bordeRadius={6}

    ml={1}
    openDelay={500}
    display={{base:"block",md:"none"}}>
        <Link display={"flex"}
        to={`${authUser?.username}`}
        as={RouterLink}
        alignItems={"center"}
        gap={4}
        _hover={{bg:"whiteAlpha.400",color:"white",borderRadius:"10px"}}
        bordeRadius={6}
        p={2}
        w={{base:10,md:"full"}}
        justifyContent={{base:"center",md:"flex-start"}}>
        <Avatar size={"sm"} src={authUser?.profilePicURL || ""}></Avatar>
        <Box display={{base:"none",md:"block"}}>Profile</Box>
        </Link>

    </Tooltip>
  )
}
