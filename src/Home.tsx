import React from 'react'
import { IoMdHome } from "react-icons/io";
import {Avatar,Container,Flex,VStack,Box,Image,Input,Button,Text,Link,Tooltip} from '@chakra-ui/react'
import Feespost from './Feespost.tsx';
import { SuggestedUser } from './SuggestedUser';
import SuggestedUsers from './SuggestedUsers';


export const Home = () => {
  return ( 
    
    <Container maxW={"container.lg"}  >
        <Flex gap={20} >
            <Box flex={2} py={10} border={""} >
      <Feespost/>
            </Box>
            <Box flex={2} mr={20}
            display={{base:"none",lg:"block"}} maxW={"300px"} border={"1px solid"} borderColor={"gray.800"}>
              <SuggestedUsers/>

            </Box>

        </Flex>
    </Container>
    
  )
}
