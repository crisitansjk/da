
import {Container,Flex,VStack,Box,Image} from '@chakra-ui/react'
import Authform from './authform'

function Auth() {
  return (
    <Flex minH={"100vh"}  align={"center"} px={4} justify="center">
        <Container maxW={"Container.md"} padding={0}>
            <Flex  alignItems={"center"} gap={10}>
                <Box display={{base:"none",md:"block"}} >
                <Image src="12450.jpg" w={"400px"} h={"600px"} borderRadius={"50px"}/>

            </Box>
            <VStack spacing={4} align={"stretch"}>
                <Authform>

                </Authform>
                <Box textAlign={"center"}>Get the app</Box>
                <Flex gap={5} justifyContent={"center"}>
                    <Image src="microsoft.png" h={"10"}/>
                    <Image src="playstore.png" h={"10"}/>


                </Flex>

            </VStack>

            </Flex>
            

        </Container>
    </Flex>
  )
}

export default Auth