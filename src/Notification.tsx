import React from 'react'
import {Avatar,Container,Flex,VStack,Box,Image,Input,Button,Text,Link,Tooltip} from '@chakra-ui/react'
import {Link as RouterLink } from "react-router-dom"
import { NotificationsLogo } from './constants'

export default function Notification() {
  return (
    <Tooltip 
    hasArrow
    label={"Notification"}
    placement="right"
    bordeRadius={6}

    ml={1}
    openDelay={500}
    display={{base:"block",md:"none"}}>
        <Link display={"flex"}
        to={ null}
        as={RouterLink}
        alignItems={"center"}
        gap={4}
        _hover={{bg:"whiteAlpha.400",color:"white",borderRadius:"10px"}}
        bordeRadius={6}
        p={2}
        w={{base:10,md:"full"}}
        justifyContent={{base:"center",md:"flex-start"}}>
        <NotificationsLogo/>
        <Box display={{base:"none",md:"block"}}>Notification</Box>
        </Link>

    </Tooltip>
  )
}
