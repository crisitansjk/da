import  {  useState } from 'react'
import {Input,Button,Alert,AlertIcon} from '@chakra-ui/react'
import UseLogin from './UseLogin'
import { useKeyPress } from "reactflow";

export default function Login({handleAuth}) {
    const spacePressed = useKeyPress('Enter');
    const [inputs,setInputs] = useState({
        email:"",
        password:"",
        
    })
    const {loading,error,login} = UseLogin()
  return (
    <>
    {error && (
        <Alert status="error" fontSize={13} p={2} borderRadius={4}>
            <AlertIcon fontSize={13}></AlertIcon>
           
        </Alert>
    )}
    {spacePressed && (
        handleAuth(inputs.email,inputs.password),
        login(inputs.email,inputs.password))}
    <Input type="email" size={"sm"} fontSize={14} placeHolder="Email"  onChange={(e)=> setInputs({...inputs,email:e.target.value})} />
    <Input type="password" size={"sm"} fontSize={14} placeHolder="Passwors" onChange={(e)=> setInputs({...inputs,password:e.target.value})}/>
    <Button w={"full"} colorScheme="blue" size={"sm"} fontSize={14} isLoading={loading} onClick={()=>{
        handleAuth(inputs.email,inputs.password),
        login(inputs.email,inputs.password)}}>
        Log in
    </Button>
   
   </>
  )
}
