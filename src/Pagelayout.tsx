
import {Flex,Box,Spinner} from '@chakra-ui/react'
import Sidebar from './Sidebar.tsx'
import { useLocation } from 'react-router-dom'

import { auth } from './firebase'
import {useAuthState} from "react-firebase-hooks/auth"
import Navbar from './Navbar'




function Pagelayout({children}) {
    const {pathname} = useLocation()
    const [user,loading,error] = useAuthState(auth)
    const canRanderSidebar = pathname !== "/auth" && user
    const canRanderNavbar = !user && !loading && pathname !== "/auth"
    const checkingUserIsAuth = !user && loading
  
  
    if(checkingUserIsAuth) return <PageLayoutSpinner/>
  return (
    <Flex flexDir={canRanderNavbar ? "column":"row"}>
        {
            canRanderSidebar  ? (
                <Box w={pathname !== "/Message" ? {base:"70px", md:"240px"}:"70px"}>
                    <Sidebar/>
                </Box>
            ):null
        }
        {canRanderNavbar ? <Navbar/>:null}

       

        <Box flex={1} w={{base:"calc(100% - 70px)" , md:"calc(100% - 240px)"}} display="flex" justifyContent="center" alignItems="center" mx={"auto"}>
            {children}
        </Box>

    </Flex>
  )
}

export default Pagelayout

const PageLayoutSpinner = () => {
    return (
    <Flex flexDir="column" h="100vh" align="center" justify="center">
        <Spinner size="x1"></Spinner>
    </Flex>
    )

}