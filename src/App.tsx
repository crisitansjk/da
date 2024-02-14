

import { Home } from './Home.tsx'
import {Routes,Route,Navigate} from "react-router-dom"
import Auth from './Auth'
import Pagelayout from './Pagelayout'
import ProfilePage from './ProfilePage'

import { auth } from "./firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import MessagePage from './MessagePage'

import NotificationPage from './NotificationPage'




function App() {

  const [authUser] = useAuthState(auth)



  return (
    <>
      <Pagelayout display="flex" justifyContent="center" align="center">
     <Routes justifyContent="center" align="center">
      <Route path="/" element={authUser ? <Home/>:<Navigate to="/auth"/>}/>
      <Route path="/auth" element={!authUser ? <Auth/>:<Navigate to="/"/>}/>
      <Route path="/:username" element={<ProfilePage/>}/>
      <Route path="Message" element={<MessagePage />}/>
      <Route path="/Notification" element={<NotificationPage/>}/>


     </Routes>
     </Pagelayout>
     
     
    </>
  )
}


export default App
