import React from 'react'
import {Avatar,Container,Flex,VStack,Box,Image,Input,Button,Text,Link,Tooltip,Spacer,Divider,Skeleton,SkeletonCircle,useDisclosure,Grid,GridItem} from '@chakra-ui/react'
import useUserProfileStore from './userProfileStore'
import useGetUserById from './useGetUserById'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { Link as RouterLink } from 'react-router-dom'



export default function Comment({comment}) {
  const {userProfiles,isLoading} = useGetUserById(comment.createdBy)
  TimeAgo.addDefaultLocale(en)
  const timeAgo = new TimeAgo()
 
  if(userProfiles){
  return (

    <Flex gap={4}>
      
        <Avatar  src={userProfiles.profilePicURL} size={"sm"} as={RouterLink} to={`/${userProfiles.username}`}></Avatar>
        
        <Flex direction={"column"}>
            <Flex gap={2} alignItem={"center"}>
                <Text fontWeight={"bold"} fontSize={14}>{userProfiles.username}</Text>
                <Text fontSize={14} >{comment.comment}</Text>
                

            </Flex>
            <Text fontSize={12} color={"gray"}>{timeAgo.format(new Date(comment.createAt))}</Text>
        </Flex>
    </Flex>
    
  )}
}
