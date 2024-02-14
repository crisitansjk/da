import  { useRef, useState } from 'react'
import {Flex,Box,Input,Button,Text,InputGroup,InputRightElement,useDisclosure} from '@chakra-ui/react'
import { CommentLogo, NotificationsLogo, UnlikeLogo } from './constants'
import usePostComment from './usePostComment'
import useAuthStore from './AuthStore'
import useLikePost from './useLikePost'

import useGetUserById from './useGetUserById'
import CommentsModal from './CommentModal'


function Postfooter({post,user}) {
 
    const [comment,setComment] = useState("")
    const {isCommenting,handlePostComment} = usePostComment()
    const authUser = useAuthStore(state=>state.user)
    const commentRef = useRef(null)
    const {handleLikePost,isLiked,isUpdating,likes} = useLikePost(post)
    const {isOpen,onOpen,onClose} = useDisclosure()
    console.log(post)
    const {userProfiles} = useGetUserById(post.createdBy)
   
    const handleSubmitComment = async() =>{
        await handlePostComment(post.id,comment)
        setComment("")
    }
  return (
    <Box mb={10} marginTop={"auto"}>
    <Flex alignItems={"center"} gap={4} w={"full"} pt={0} mb={2} mt={"auto"} cursor={"pointer"}>
        <Box onClick={handleLikePost}  fontSize={18} display="flex" direction="row">
            {!isLiked ? <NotificationsLogo/> : <UnlikeLogo/>}
          
        </Box>
        <Box fontSize={18} onClick={()=>commentRef.current.focus()}>
            <CommentLogo/>
        </Box>

    </Flex>
    <Text fontWeight={600} fontSize={"sm"}>
        {likes} likes
    </Text>
    {!authUser && (
        <Text>
        <Text>
            {user.username}{" "}
            <Text as={"span"}>
                buna ce mai faceti
            </Text>
        </Text>
       
        <Text color={"gray"}>
            wiew all {post.comments.length} comment
        </Text>
    </Text>
    )}
    {authUser && (
        <>
    <Flex direction={"column"}>
        <Text>
            {userProfiles && userProfiles.username}{" "}
            <Text as={"span"} fontSize={14}>
                {post.caption}
            </Text>
        </Text>
         <Text color={"gray"} fontSize={15} cursor={"pointer"} onClick={onOpen}>
            wiew all {post.comments.length} comment
        </Text>
        <InputGroup>
        <Input variant={"flushed"} placeHolder={"Please put comment..."} fontSize={14} onChange={(e)=>setComment(e.target.value)} value={comment} ref={commentRef}/>
        <InputRightElement>
             <Button fontSize={14} color={"blue.500"} fontWeight={"blue.500"} cursor={"pointer"} _hover={{color:"white"}} bg={"transparent"} onClick={handleSubmitComment} isLoading={isCommenting}>
                  Post
             </Button>
        </InputRightElement>
        
        </InputGroup>
    </Flex>
    {isOpen && <CommentsModal isOpen={isOpen} onClose={onClose} post={post}/>}
    </>
    
    )}
    </Box>
  )
}

export default Postfooter