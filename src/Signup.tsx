import React, { useState } from 'react'
import {Container,Flex,VStack,Box,Image,Input,Button,Text,InputGroup,InputRightElement,Alert,AlertIcon} from '@chakra-ui/react'
import { ViewIcon } from '@chakra-ui/icons'
import { ViewOffIcon } from '@chakra-ui/icons'
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import UseSignupWhitEmail from './UseSignupWhitEmail';
import { useToast } from '@chakra-ui/react'



export default function Signup({handleAuth}) {
    const [showPass,setShowPass] = useState(false)
    const [passType,setPassType] = useState("password")
    const {loading,error,signup} = UseSignupWhitEmail()
    const [inputs,setInputs] = useState({
        fullName:"",
        userName:"",
        email:"",
        password:"",
       
    })
    const handlePass = () =>{
        if(showPass == true){
            setPassType("password")
            setShowPass(false)
        }else{
            setPassType("text")
            setShowPass(true)

        }
    }
    const toast = useToast()
  return (
    <>
     <Input type="email" size={"sm"} fontSize={14} placeHolder="Email" value={inputs.email} onChange={(e)=> setInputs({...inputs,email:e.target.value})} />
     <Input type="userName" size={"sm"} fontSize={14} placeHolder="text" value={inputs.userName} onChange={(e)=> setInputs({...inputs,userName:e.target.value})} />
     <Input type="fullName" size={"sm"} fontSize={14} placeHolder="text" value={inputs.fullName} onChange={(e)=> setInputs({...inputs,fullName:e.target.value})} />
    <InputGroup>
    <Input type={passType} size={"sm"} fontSize={14} placeHolder="Passwors" onChange={(e)=> setInputs({...inputs,password:e.target.value})}/>
    <InputRightElement h={"full"}>
    <Button variant={"ghost"} size={"sm"} onClick={()=> setShowPass(!showPass),handlePass}>
        {showPass ? <ViewIcon/>:<ViewOffIcon/>}
    </Button>
    </InputRightElement>
    </InputGroup>
    {error && (
        <Alert status="error" fontSize={13} p={2} borderRadius={4}>
            <AlertIcon fontSize={13}></AlertIcon>
           
        </Alert>
    )}
    <Button w={"full"} colorScheme="blue" size={"sm"} fontSize={14} isLoading={loading} onClick={()=>signup(inputs.email,inputs.password,inputs.fullName,inputs.userName)} >
                 Sing up
                 
            </Button>
    </>
  )
}
