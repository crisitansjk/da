import React from 'react'
import {Avatar,Container,Flex,VStack,Box,Image,Input,Button,Text,Link,Tooltip,InputGroup,InputRightElement} from '@chakra-ui/react'
import SuggestedHeader from './SuggestedHeader'
import { SuggestedUser } from './SuggestedUser'
import useGetSuggestedUsers from './useGetSugestedUser'

export default function SuggestedUsers() {
  const {isLoading,suggestedUsers} = useGetSuggestedUsers()

  if(isLoading) return null
  return <VStack py={8} px={6} gap={4}>
    <SuggestedHeader/>

    <Flex alignItems={"center"} justify={"space-between"} w={"full"}>
        <Text fontSize={12} fontWeight={"bold"} color={"gray.500"}>
            Suggested for you
        </Text>
        <Text fontSize={12} fontWeight={"bold"} _hover={{color:"gray.400"}} cursor={"pointer"}>
            See All
        </Text>
    </Flex>
    {suggestedUsers.map(user=>{
      return <SuggestedUser user={user} />
    })}


  </VStack>
    
  
}
