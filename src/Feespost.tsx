import React, { useEffect, useState } from 'react'
import {Avatar,Container,Flex,VStack,Box,Image,Input,Button,Text,Link,Tooltip,Spacer,Skeleton,SkeletonCircle} from '@chakra-ui/react'
import Feepost from './Feepost.tsx'
import useGetFeedPosts from './useGetFeedPost'

function Feespost() {


  const {isLoading,posts} = useGetFeedPosts()

  
  return (
    <Container maxW={"container.sm"} py={10} px={2}>
      
            {isLoading && [1,2,3,4].map((item,index) => (
              <VStack key={index} gap={4} mb={10}>
                <Flex gap={2}>
                  <SkeletonCircle size="10"></SkeletonCircle>
                  <VStack align={"flex-end"}>
                    <Skeleton height="2" w={"200px"}/>
                    <Skeleton height="2" w={"200px"}/>
                      


                  </VStack>
                </Flex>
                <Skeleton w={"full"}>
                  <Box h={"500px"}>content</Box>
                </Skeleton>
              </VStack>
            ))}
            {!isLoading && posts.length > 0 && posts.map((post)=><Feepost key={post.id} post={post}/>)}
            {!isLoading && posts.length === 0 && (
              <>
                <Text fontSize={"md"} color={"red.400"}>
                  Dayuum. Looks like you don&apos;t have any friends.
                </Text>
                <Text color={"red.400"}>Stop coding and go make some!!</Text>
              </>
            )}
             
            
          

         
          

    
    </Container>
  )
}

export default Feespost