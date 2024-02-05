import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import {Button} from '@chakra-ui/react'
import { Home } from './Home.tsx'
import {Routes,Route,Router,Navigate} from "react-router-dom"
import Auth from './Auth'
import Pagelayout from './Pagelayout'
import ProfilePage from './ProfilePage'

import { auth } from "./firebase"
import { useAuthState } from "react-firebase-hooks/auth"




function App() {
  const [count, setCount] = useState(0)
  const [authUser] = useAuthState(auth)

  return (
    <>
      <Pagelayout display="flex" justifyContent="center" align="center">
     <Routes justifyContent="center" align="center">
      <Route path="/" element={authUser ? <Home/>:<Navigate to="/auth"/>}/>
      <Route path="/auth" element={!authUser ? <Auth/>:<Navigate to="/"/>}/>
      <Route path="/:username" element={<ProfilePage/>}/>
     </Routes>
     </Pagelayout>
     
     
    </>
  )
}


export default App
