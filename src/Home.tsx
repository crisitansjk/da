
import {Container,Flex,Box} from '@chakra-ui/react'
import Feespost from './Feespost.tsx';

import SuggestedUsers from './SuggestedUsers';


export const Home = ({actv}) => {
  return ( 
    
    <Container maxW={"container.lg"}  >
        <Flex gap={10} >
            <Box flex={10} py={10} >
      <Feespost/>
            </Box>
            <Box flex={2} mr={0}
            display={{base:"none",lg:"block"}} maxW={"340px"} border={"1px solid"} borderColor={"gray.800"}>
              <SuggestedUsers/>

            </Box>

        </Flex>
    </Container>
    
  )
}
