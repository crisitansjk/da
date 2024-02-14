

import {Flex,VStack,Box,Text,Skeleton,Grid} from '@chakra-ui/react'
import ProfilePost from './ProfilePost'

import useGetUserPosts from './useGetUserPost'



export default function ProfilePosts() {

 
  const {isLoading,posts} = useGetUserPosts()

  const noPostsFound = !isLoading && posts.length === 0
  if(noPostsFound) return <NoPostsFound/>
  
  



  return (
    <Grid
    templateColumns={{sm:"repeat(1,1fr)",md:"repeat(3,1fr)"}} 
    gap={1}
    columnGap={1}
    >
    {isLoading && [1,2,3,4,5,6].map((da,idx)=>{
      return(
      <VStack key={idx} mx={0} my={1} alignItems={""} > 
        <Skeleton w={"300px"}>
          <Box h={"300px"}>content</Box>
        </Skeleton>
        

      </VStack>
      )
    })}
    {!isLoading && (
      <>
        {posts.map((item)=>{
          return <ProfilePost posts={item} key={item.id}/>
        })}

      </>
    )}

    </Grid>
  )
}


const NoPostsFound = () => {
  return (
    <Flex flexDir={"column"} textAlig={"center"} mx={"auto"} mt={10}>
      <Text fontSize={"2x1"}>No Posts Found</Text>
    </Flex>
  )
}