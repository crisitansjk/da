
import Postfooter from './Postfooter'
import Postheader from './Postheader'
import {Box,Image} from '@chakra-ui/react'
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