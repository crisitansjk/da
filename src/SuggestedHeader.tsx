
import {Avatar,Flex,Button,Text} from '@chakra-ui/react'
import {Link} from "react-router-dom"
import UseLogOut from './useLogOut'
import useAuthStore from './AuthStore'

export default function SuggestedHeader() {
  const {handleLogOut,isLoggingOut} = UseLogOut()
  const authUser = useAuthStore((state) => state.user)
  if(!authUser) return null
  return <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
    <Flex  alignItems={"center"} gap={2} >
    <Link  >
        <Flex align={"center"} gap={2}>
        <Link to={`${authUser.username}`}>
        <Avatar name="as a programer" size="lg" src={authUser.profilePicURL}/>
        </Link>
        <Link to={`${authUser.username}`}>
        <Text fontSize={12} fontWeight={"bold"} title={authUser.username} _hover={{textDecorationLine:"underline"}}>
          {authUser.username.length > 15 ? authUser.username.substr(0,15) + "...":authUser.username}
            

        </Text>
        </Link>
        </Flex>
        
        </Link>
        <Button
         size={"xs"}
         background={"transparent"}
         _hover={{background:"transparent"}}
         
         fontSize={14}
         fontWeight={"medium"}
         color={"blue.400"}
         gap={4}
         mx={2}
         style={{textDecoration:"none"}}
         onClick={handleLogOut}
         isLoading={isLoggingOut}

         >Log out</Button>

    </Flex>

  </Flex>
}
