import React, { useState } from 'react'
import {Avatar,Container,Flex,VStack,Box,Image,Input,Button,Text,Link,Tooltip,Spacer,Divider,Skeleton,SkeletonCircle,useDisclosure,Grid,GridItem} from '@chakra-ui/react'
import {AiFillHeart} from "react-icons/ai"
import {FaComment} from "react-icons/fa"
import {MdDelete} from "react-icons/md"
import  Comment  from './Comment'
import { Link as RouterLink } from 'react-router-dom'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import Postfooter from './Postfooter'
import useAuthStore from './AuthStore'
import useUserProfileStore from './userProfileStore'
import useShowToast from './useShowToast'
import usePostStore from './postStore'
import { deleteObject, ref } from "firebase/storage";
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { firestore, storage } from "./firebase";
import Caption from './Caption'

export default function ProfilePost({posts}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const authUser = useUserProfileStore((state)=> state.userProfile)
  const userProfile = useAuthStore(state => state.user)
  const deletePost = usePostStore((state) => state.deletePost);
  const [isDeleting, setIsDeleting] = useState(false);

	const decrementPostsCount = useUserProfileStore((state) => state.deletePost);
  const showToast = useShowToast()

	const handleDeletePost = async () => {
		if (!window.confirm("Are you sure you want to delete this post?")) return;
		if (isDeleting) return;

		try {
			const imageRef = ref(storage, `posts/${posts.id}`);
			await deleteObject(imageRef);
			const userRef = doc(firestore, "users", authUser.uid);
			await deleteDoc(doc(firestore, "posts", posts.id));

			await updateDoc(userRef, {
				posts: arrayRemove(posts.id),
			});

			deletePost(posts.id);
			decrementPostsCount(posts.id);
			showToast("Success", "Post deleted successfully", "success");
		} catch (error) {
			showToast("Error", error.message, "error");
		} finally {
			setIsDeleting(false);
		}
	};
  return (

    <>
    {console.log(posts)}
    <GridItem
    templateColumns={{sm:"repeat(1,1fr)",md:"repeat(3,1fr)"}} 
    gap={1}
    columnGap={1}
    position={"relative"}
    aspectRation={1/1}
    onClick={onOpen}
    >
    
      <Flex
      opacity={0}
      _hover={{opacity:1}}
      position={"absolute"}
      top={0}
      left={0}
      right={0}
      bottom={0}
      bg={"blackAlpha.700"}
      transition={"all 0.3s ease"}
      zIndex={1}
      justifyContent={"center"}
      >
      <Flex align={"center"} justifyContent={"center"}>
      <Flex>
        <AiFillHeart size={20}></AiFillHeart>
        <Text fontWeight={"bold"} mr={2} ml={1}>7</Text>
      </Flex>
      <Flex>
        <FaComment size={20}></FaComment>
        <Text fontWeight={"bold"} mr={2} ml={1}>7</Text>
      </Flex>
      </Flex>
      </Flex>
     
       
      <Image src={posts.imageURL} w={"300px"} h={"300px"} objectFit={"cover"}></Image>
      
        


  
    </GridItem>

    <Modal isOpen={isOpen} onClose={onClose} isCentered={true} size={{base:"4xl"}}>
        <ModalOverlay />
        <ModalContent bg='blackAlpha.900'  >
          <ModalHeader/>
          <ModalCloseButton />
          <ModalBody pb={5}>
            <Flex   justifyContent={"center"} gap={4} w={{base:"90%",sm:"70%",md:"full"}} mx={"auto"}  minH={"50vh"} maxH={"90vh"}>
              <Flex bordeRadius={4} overflow={"hidden"} flex={1.5} justifyContent={"center"} align={"center"}>
              <Image src={posts.imageURL}></Image>
              </Flex>
              <Flex flex={1} flexDir={"column"} px={10} display={{base:"none",md:"flex"}}>
                <Flex align={'center'} justifyContent={"space-between"}>
                <Flex align={"center"} justifyContent={"center"} gap={4}>
                  <Avatar src={authUser.profilePicURL}></Avatar>
                  <Text fontWeight={"bold"} fontSize={12}>{authUser.username}</Text>
                </Flex>
                {authUser.uid === userProfile.uid && (
                <Button onClick={handleDeletePost} size={"sm"} bg={"transparent"} _hover={{bg:"whiteAlpha.300",color:"red.600"}} borderRadius={4} p={1}>
                  <MdDelete size={20}></MdDelete>
                </Button>)}
                

              </Flex>
              <Divider my={4} bg={"gray.500"}></Divider>
              <VStack w={"full"} alignItems={"start"} maxH={"350px"} overflowY={"auto"}>
                {posts.caption && (
                  <Caption post={posts}/>
                )}
               {posts.comments.map(comment=>{
                   return <Comment key={comment.id} comment={comment}/>
               })}
                
              </VStack>

              <Divider my={4} bg={"gray.500"}></Divider>
              <Postfooter isProfilePage={true} user={posts} post={posts}></Postfooter>
              
              </Flex>
              
            </Flex>
            
            
          </ModalBody>

          <ModalFooter>
            
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
