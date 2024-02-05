import React from 'react'
import Postfooter from './Postfooter'
import Postheader from './Postheader'
import {Avatar,Container,Flex,VStack,Box,Image,Input,Button,Text,Link,Tooltip} from '@chakra-ui/react'
import useGetUserById from './useGetUserById'


function Feepost({post}) {
  const {userProfiles} = useGetUserById(post.createdBy)
  return (
    <>
    {console.log(post)}
    <Postheader post={post} creator={userProfiles}/>
    <Box my={2} borderRadius={4} overflow={"hidden"}>
        <Image src={post.imageURL} alt={post.username}/>
    </Box>
    <Postfooter post={post} user={userProfiles}/>
    
    </>
  )
}

export default Feepost