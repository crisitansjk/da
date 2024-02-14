
import {Container,Flex,VStack,Text,Link} from '@chakra-ui/react'
import ProfilHeader from './ProfilHeader'
import ProfilTabs from './ProfilTabs'
import ProfilePosts from './ProfilePosts'
import { useParams } from 'react-router-dom'
import useGetUserProfileByUsername from './useGetUserProfileByUsername'
import { Link as RouterLink } from 'react-router-dom'
import { Skeleton, SkeletonCircle } from "@chakra-ui/react";

export default function ProfilePage() {
  const {username} = useParams()
  const {isLoading,userProfile} = useGetUserProfileByUsername(username)

  const userNotFound = !isLoading && !userProfile
  if(userNotFound) return <UserNotFound/>
  return <Container maxW={"container.lg"} py={5}>
    {console.log(username)}
    <Flex py={10} px={4} mx={"auto"} w={"full"} flexDirection={"column"} pl={{base:4,md:10}}>
        {!isLoading && userProfile && <ProfilHeader/>}
        {isLoading && <ProfileHeaderSkeleton/> }
    </Flex>
    <Flex px={{base:2,sm:4}} mx={"auto"} maxW={"full"} borderTop={"1px solid"} direction={"column"} borderColor={"whiteAlpha.300"}>
        <ProfilTabs/>
        
        <ProfilePosts/>
    </Flex>

  </Container>
}


const UserNotFound = () => {
  return (
    <Flex flex={"column"} textAlig={"center"} mx={"auto"}>
      <Text fontSize={"2x1"} textAlign={"center"} mx={"auto"}>
        <Link as={RouterLink} to={"/"} color={"blue.500"} w={"max-content"} mx={"auto"}>Go home</Link>
      </Text>
    </Flex>
  )
}

const ProfileHeaderSkeleton = () => {
	return (
		<Flex
			gap={{ base: 4, sm: 10 }}
			py={10}
			direction={{ base: "column", sm: "row" }}
			justifyContent={"center"}
			alignItems={"center"}
		>
			<SkeletonCircle size='24' />

			<VStack alignItems={{ base: "center", sm: "flex-start" }} gap={2} mx={"auto"} flex={1}>
				<Skeleton height='12px' width='150px' />
				<Skeleton height='12px' width='100px' />
			</VStack>
		</Flex>
	);
};