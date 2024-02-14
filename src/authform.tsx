import  { useState } from 'react'
import {Flex,VStack,Box,Text} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import Login from './Login'
import Signup from './Signup'
import GoogleAuth from './GoogleAuth'
import useShowToast from './useShowToast'

function Authform() {
    const [isAuth,setIsAuth] = useState(true)
  
    const navigate = useNavigate()
    const showToast = useShowToast()
    const [inputs,setInputs] = useState({
        email:"",
        password:"",
        confirmPassword:""
    })
    console.log(inputs)
    const handleAuth = (email,password) => {
        if(!email || !password ){
            showToast("ERROR","Please fill the fields","error")
            return
        }
        navigate("/")
    }
  return (
    <>
    <Box border={"1px solid gray"} borderRadius={20} padding={5}>
        <VStack spacing={4}>
            {/* <Image src="logo.png" h={24}/> */}
            <Text fontSize={"24px"} color={"gray.400"} fontWeight={"bold"}>CoMmUpS</Text>
           
            

            {isAuth ? <Login handleAuth={handleAuth}/>:<Signup/>}

            <Flex alignItems={"center"} justifyContent={"center"} my={4} gap={1} w={"full"}>
                <Box flex={2} h={"1px"} bg={"gray.400"}/>
                <Text mx={1} color={"white"}>OR</Text>
                <Box flex={2} h={"1px"} bg={"gray.400"}/>

            </Flex>

            <GoogleAuth prefix={isAuth ? "Log in":"Sign in"}/>


        </VStack>

    </Box>
    <Box border={"1px solid gray"} borderRadius={20} padding={5}>
        <Flex alignItems={"center"} justifyContent={"center"}>
            <Box mx={2} fontSize={14}>
                {isAuth ? "Don't have an account ?":"already have an account"}

            </Box>
            <Box mx={2} fontSize={14} color={"blue.500"} onClick={()=>setIsAuth(!isAuth)}>
                {isAuth ? "Sign up":"Log in"}

            </Box>

        </Flex>
    </Box>
    </>
  )
}

export default Authform