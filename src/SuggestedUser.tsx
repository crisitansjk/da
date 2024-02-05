import React, { useState } from 'react'
import {Avatar,Container,Flex,VStack,Box,Image,Input,Button,Text,Link,Tooltip,InputGroup,InputRightElement} from '@chakra-ui/react'
import useFollowUser from './useFollowUser'
import useAuthStore from './AuthStore'
import { Link as RouterLink } from 'react-router-dom'

export const SuggestedUser = ({user,setUser}) => {
    const {isFollowing,isUpdating,handleFollowUser} = useFollowUser(user.uid)
    const authUser = useAuthStore(state=>state.user)
    

    const onFollowUser = async() =>{
        await handleFollowUser()
        setUser({
            ...user,
            followers:isFollowing ? user.followers.filter((elem) => elem.uid !== authUser.uid ):[...user.followers,authUser.uid]
    })

    }
  return (
    <Flex justifyContent={"space-between"} w={"full"} align={"center"}>
        <Flex align={"center"} gap={2}>
           
            <Avatar src={user.profilePicURL} name={user.username} size={"md"} as={RouterLink} to={`/${user.username}`}/>
            
            <VStack spacing={2} align={"flex-start"}>
                <Box fontSize={12} fontWeight={"bold"}>
                    {user.username}
                </Box>
                <Box fontSize={11} color={"gray.500"}>
                    {} fallowers
                </Box>

            </VStack>

        </Flex>
        {authUser.uid !== user.uid && (
        <Button
        fontSize={11}
        bg={"transparent"}
        p={0}
        fontWeight={"medium"}
        color={"blue.400"}
        _hover={{color:"white"}}
        onClick={onFollowUser}
        isLoading={isUpdating}
        >{isFollowing ? "Unfallow":"Fallow"}

        </Button>)}
    </Flex>
  )
}
