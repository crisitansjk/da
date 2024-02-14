
import {Avatar,Flex,VStack,Button,Text,AvatarGroup,useDisclosure} from '@chakra-ui/react'
import useAuthStore from './AuthStore'
import useUserProfileStore from './userProfileStore'
import EditProfile from './EditProfile'

import useFollowUser from './useFollowUser'

export default function ProfilHeader() {
    const {userProfile} = useUserProfileStore()
    const authUser = useAuthStore(state=>state.user)
    const {isFollowing,isUpdating,handleFollowUser} = useFollowUser(userProfile?.uid)
    const visitingOwnProfileAndAuth = authUser && authUser.username === userProfile.username
    const visitingAnotherUserProfile = authUser && authUser.username !== userProfile.username
    const {isOpen,onOpen,onClose} = useDisclosure()
    
    

   

  return (
    <Flex direction={{base:"column",sm:"row"}} gap={{base:4,sm:10}} py={10}>
        <AvatarGroup size={{base:"x1",ms:"2x1"}} alignSelf={"flex-start"} justifySelf={"center"} mx={"auto"} overflow="hidden">
            <Avatar src={authUser.profilePicURL } h={"200px"} w={"200px"}></Avatar>
        </AvatarGroup>
        <VStack alignItems={"start"} gap={2} mx={"auto"} flex={1}>
            
            <Flex gap={4} direction={{base:"column",sm:"row"}} justifyContent={"center"} alignItems={"center"}>
                <Text fontSize={{base:"sm",md:"lg"}}>{userProfile.username}</Text>
                {visitingOwnProfileAndAuth && (
                <Flex gap={4} alignItems={"center"} justifyContent={"center"}>
                    <Button bg={"white"} color={"black"} _hover={{bg:"whiteAlpha.800"}} size={{base:"xs",md:"sm"}} onClick={()=>onOpen()}>
                        Edit Profile
                    </Button>

                </Flex>
                )}
                {visitingAnotherUserProfile && (
                <Flex gap={4} alignItems={"center"} justifyContent={"center"}>
                    <Button bg={!isFollowing ? "blue.400":"white"} color={!isFollowing ? "white":"black"} _hover={{bg:"whiteAlpha.800"}} size={{base:"xs",md:"sm"}} onClick={handleFollowUser} isLoading={isUpdating}>
                       {!isFollowing ? "Fallow":"Unfallow"}
                    </Button>

                </Flex>
                )}
            </Flex>
            <Flex gap={{base:2,sm:4}} align={"center"} >
                <Flex >
                    <Text mr={1}>{userProfile.posts && userProfile.posts.length}</Text>
                    Post
                </Flex>
                <Flex>
                    <Text mr={1}>{userProfile.follower && userProfile.follower.length}</Text>
                    Fallowers
                </Flex>
                <Flex>
                    <Text mr={1}>{userProfile.following &&  userProfile.following.length}</Text>
                    Fallow
                </Flex>

            </Flex>
            <Flex alignItems={"center"} gap={4}>
                <Text fontSize={"sm"} fontWeight={"bold"}>{userProfile.username}</Text>

            </Flex>
            <Text fontSize={"sm"}>{userProfile.bio}</Text>
        </VStack>
        {isOpen && <EditProfile isOpen={isOpen} onClose={onClose}/>}
    </Flex>
    
  )
}

