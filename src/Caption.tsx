
import {Avatar,Flex,Text} from "@chakra-ui/react"

import TimeAgo from 'javascript-time-ago'
import useUserProfileStore from './userProfileStore'
import en from 'javascript-time-ago/locale/en'
import {Link as RouterLink} from "react-router-dom"
const Caption = ({post}) => {
    TimeAgo.addDefaultLocale(en)
    const timeAgo = new TimeAgo()
    const userProfiles = useUserProfileStore(state=>state.userProfile)
  return (
    <Flex gap={4}>
      
    <Avatar  src={userProfiles.profilePicURL} size={"sm"} as={RouterLink} to={`/${userProfiles.username}`}></Avatar>
    
    <Flex direction={"column"}>
        <Flex gap={2} alignItem={"center"}>
            <Text fontWeight={"bold"} fontSize={14}>{userProfiles.username}</Text>
            <Text fontSize={14} >{post.comment}</Text>
            

        </Flex>
        <Text fontSize={12} color={"gray"}>{timeAgo.format(new Date(post.createdAt))}</Text>
    </Flex>
</Flex>
  )
}

export default Caption