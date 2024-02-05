import React from 'react'
import {Avatar,Container,Flex,VStack,Box,Image,Input,Button,Text,Link,Tooltip,Spacer} from '@chakra-ui/react'
import useFollowUser from './useFollowUser'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
function Postheader({post,creator}) {
    TimeAgo.addDefaultLocale(en)
    const timeAgo = new TimeAgo()
    if(creator){
        const {isFollowing,handleFollowUser,isUpdating} = useFollowUser(creator.uid)
    
    

  return (
    <>
    <Flex   align="center"  mt={5}>
        <Flex align={"center"} gap={2} >
           
            {creator ? (
                 <Flex align={"center"} >
                 <Avatar src={creator.profilePicURL} size={"sm"} m={1} />
                <Flex fontSize={12} gap={2} fontWeight={"bold"} mr={4}>
                    {creator.username}
                    <Box color={"gray.500"}>
                        {timeAgo.format(Number(new Date(post.createdAt)))}
                    </Box>

                </Flex>
                </Flex>
            ):null}
              
                <Flex>
                <Box cursor={"pointer"}>
                    <Text fontSize={12} color={"blue.500"} _hover={{color:"white",}} fontWeight={"bold"} transition={"0.2s ease-in-out"} onClick={handleFollowUser} isLoading={isUpdating}>
                        {isFollowing ? "Unfollow":"Follow"}
                    </Text>
                </Box>
                </Flex>

            
            

        </Flex>

    </Flex>
    </>
  )}
}

export default Postheader