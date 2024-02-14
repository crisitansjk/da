
import { SearchLogo } from './constants'
import {Flex,Box,Input,Button,Tooltip,useDisclosure,Modal,ModalOverlay,ModalContent,ModalHeader,ModalCloseButton
,ModalBody,FormControl,FormLabel} from '@chakra-ui/react'

import { SuggestedUser } from './SuggestedUser'
import useSearchUser from './useSearchUser'
import { useRef } from "react";
import { useLocation } from 'react-router-dom';

export default function Search({actv}) {
    const {isOpen,onOpen,onClose} = useDisclosure()
    const {isLoading,user,getUserProfile,setUser} = useSearchUser()
    const searchRef = useRef(null);
	const {pathname} = useLocation()


    const handleSearchUser = (e) => {
        e.preventDefault()
        getUserProfile(searchRef.current.value)
        console.log(user)
    }
    
  return (
    <>
     			<Tooltip
    				hasArrow
    				label={"Search"}
    				placement='right'
    				ml={1}
    				openDelay={500}
    				display={{base:"none",md:"block"}}
    			>
    				<Flex
    					alignItems={"center"}
    					gap={4}
    					_hover={{ bg: "whiteAlpha.400" }}
    					borderRadius={6}
    					p={2}
    					w={{ base: 10, md: "full" }}
    					justifyContent={{ base: "center", md: "flex-start" }}
                        onClick={onOpen}
    				>
    					<SearchLogo />
    					<Box display={pathname !== "/Message" ? {base:"none",md:"block"}:"none"}>Search</Box>
    				</Flex>
    			</Tooltip>

                <Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInLeft'>
				<ModalOverlay />
				<ModalContent bg={"black"} border={"1px solid gray"} maxW={"400px"}>
					<ModalHeader>Search user</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6} >
						<form onSubmit={handleSearchUser} >
							<FormControl mb={7}>
								<FormLabel>Username</FormLabel>
								<Flex align={"center"}>
								<Input  ref={searchRef} />
								<Button type='submit' ml={"auto"} size={"sm"} my={4} isLoading={isLoading}>
									Search
								</Button>
								</Flex>
							</FormControl>

							
						</form>
						{user && <Flex mb={10}><SuggestedUser   user={user} setUser={setUser} /></Flex>}
					</ModalBody>
				</ModalContent>
			</Modal>

                
    		</>

  )
}
