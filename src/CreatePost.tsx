import  { useRef, useState } from 'react'
import { CreatePostLogo } from './constants'
import {Flex,Box,Image,Input,Button,Tooltip,Textarea,Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
    CloseButton,

	useDisclosure,} from '@chakra-ui/react'

import { useLocation } from 'react-router-dom';

import { BsFillImageFill } from "react-icons/bs";
import usePreviewImg from './usePreviewImg';
import useShowToast from './useShowToast';
import useAuthStore from './AuthStore';
import usePostStore from './postStore';
import useUserProfileStore from './userProfileStore';
import { addDoc, arrayUnion, collection, doc, updateDoc } from "firebase/firestore";
import { firestore, storage } from "./firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";


export default function CreatePost({actv}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [caption,setCaption] = useState("")
    const imageRef = useRef(null)
    const {handleImageChange,selectedFile,setSelectedFile} = usePreviewImg()
    const { isLoading, handleCreatePost } = useCreatePost();
	const {pathname} = useLocation()
    
    const handlePostCreation = async () => {
		try {
			await handleCreatePost(selectedFile, caption);
			onClose();
			setCaption("");
			setSelectedFile(null);
		} catch (error) {
			showToast("Error", error.message, "error");
		}
	};
  return (
    <>
    <Tooltip 
    hasArrow
    label={"Create"}
    placement="right"
    bordeRadius={6}

    ml={1}
    openDelay={500}
    display={actv ? {base:"none",md:"block"}:{base:"block",md:"none"}}>
        <Flex 
        alignItems={"center"}
        gap={4}
        _hover={{bg:"whiteAlpha.400",color:"white",borderRadius:"10px"}}
        bordeRadius={6}
        p={2}
        w={{base:10,md:"full"}}
        justifyContent={{base:"center",md:"flex-start"}} onClick={onOpen}>
        
        <CreatePostLogo/>
        <Box display={pathname !== "/Message" ? {base:"none",md:"block"}:"none"}>Create</Box>
        </Flex>

    </Tooltip>
     <Modal isOpen={isOpen} onClose={onClose} size='xl'>
				<ModalOverlay />

				<ModalContent bg={"black"} border={"1px solid gray"}>
					<ModalHeader>Create Post</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<Textarea placeholder='Post caption...' value={caption} onChange={(e)=>setCaption(e.target.value)}/>

						<Input type='file' hidden ref={imageRef} onChange={handleImageChange}/>

						<BsFillImageFill
                        onClick={()=>imageRef.current.click()}
							style={{ marginTop: "15px", marginLeft: "5px", cursor: "pointer" }}
							size={16}
						/>
                        {selectedFile && (
                            <Flex mt={5} w={"full"} position={"relative"} justifyContent={"center"}>
                                <Image src={selectedFile}/>
                                <CloseButton
                                top={2}
                                position={"absolute"}
                                right={2}
                                onClick={()=>setSelectedFile(null)}/>
                            </Flex>
                        )}
                        
					</ModalBody>

					<ModalFooter>
						<Button mr={3} onClick={handlePostCreation}>Post</Button>
					</ModalFooter>
				</ModalContent>
		</Modal> 
        </>
  )
}
function useCreatePost() {
	const showToast = useShowToast();
	const [isLoading, setIsLoading] = useState(false);
	const authUser = useAuthStore((state) => state.user);
	const createPost = usePostStore((state) => state.createPost);
	const addPost = useUserProfileStore((state) => state.addPost);
	const userProfile = useUserProfileStore((state) => state.userProfile);
	const { pathname } = useLocation();

	const handleCreatePost = async (selectedFile, caption) => {
		if (isLoading) return;
		if (!selectedFile) throw new Error("Please select an image");
		setIsLoading(true);
		const newPost = {
			caption: caption,
			likes: [],
			comments: [],
			createdAt: Date.now(),
			createdBy: authUser.uid,
		};

		try {
			const postDocRef = await addDoc(collection(firestore, "posts"), newPost);
			const userDocRef = doc(firestore, "users", authUser.uid);
			const imageRef = ref(storage, `posts/${postDocRef.id}`);

			await updateDoc(userDocRef, { posts: arrayUnion(postDocRef.id) });
			await uploadString(imageRef, selectedFile, "data_url");
			const downloadURL = await getDownloadURL(imageRef);

			await updateDoc(postDocRef, { imageURL: downloadURL });

			newPost.imageURL = downloadURL;

			if (userProfile.uid === authUser.uid) createPost({ ...newPost, id: postDocRef.id });

			if (pathname !== "/" && userProfile.uid === authUser.uid) addPost({ ...newPost, id: postDocRef.id });

			showToast("Success", "Post created successfully", "success");
		} catch (error) {
			showToast("Error", error.message, "error");
		} finally {
			setIsLoading(false);
		}
	};

	return { isLoading, handleCreatePost };
}
