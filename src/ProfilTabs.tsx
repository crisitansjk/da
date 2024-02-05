import React from 'react'
import {Avatar,Container,Flex,VStack,Box,Image,Input,Button,Text,Link,Tooltip,InputGroup,AvatarGroup,InputRightElement} from '@chakra-ui/react'
import {BsGrid3X3,BsBookmark,BsSuitHeart} from "react-icons/bs"

export default function ProfilTabs() {
  return (
    <Flex
    w={"full"}
    justifyContent={"center"}
    gap={{base:4,sm:10}}
    textTransform={"uppercase"}
    fontWeight={"bold"}>
      <Flex borderTop={"1px solid white"} alignItems={"center"} p="5" gap={1} cursor={"pointer"}>
        <Box fontSize={20}>
          <BsGrid3X3/>
        </Box>
        <Text fontSize={12} display={{base:"none",sm:"block"}}>Posts</Text>
      </Flex>
      <Flex  alignItems={"center"} p="5" gap={1} cursor={"pointer"}>
        <Box fontSize={20}>
          <BsBookmark/>
        </Box>
        <Text fontSize={12} display={{base:"none",sm:"block"}}>Posts</Text>
      </Flex>
      <Flex alignItems={"center"} p="5" gap={1} cursor={"pointer"}>
        <Box fontSize={20}>
          <BsSuitHeart/>
        </Box>
        <Text fontSize={12} display={{base:"none",sm:"block"}}>Posts</Text>
      </Flex>
      <Flex></Flex>
      <Flex></Flex>

    </Flex>
  )
}
