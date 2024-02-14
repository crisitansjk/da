
import useAuthStore from './AuthStore'
import {Avatar,Box,Link,Tooltip} from '@chakra-ui/react'
import {Link as RouterLink } from "react-router-dom"
import {useLocation} from "react-router-dom"

export default function ProfileLink({actv}) {
    const authUser = useAuthStore((state)=>state.user)
    const {pathname} = useLocation()
  return (
    <Tooltip
    hasArrow
    label={"Profile"}
    placement="right"
    bordeRadius={6}

    ml={1}
    openDelay={500}
    display={{base:"none",md:"block"}}>
        <Link display={"flex"}
        to={`${authUser?.username}`}
        as={RouterLink}
        alignItems={"center"}
        gap={4}
        _hover={{bg:"whiteAlpha.400",color:"white",borderRadius:"10px"}}
        bordeRadius={6}
        p={2}
        w={{base:10,md:"full"}}
        justifyContent={{base:"center",md:"flex-start"}}>
        <Avatar size={"xs"} src={authUser?.profilePicURL || ""}></Avatar>
        <Box display={pathname !== "/Message" ? {base:"none",md:"block"}:"none"}>Profile</Box>
        </Link>

    </Tooltip>
  )
}
