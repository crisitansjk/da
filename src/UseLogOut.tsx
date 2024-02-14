
import { auth } from './firebase';
import useShowToast from './useShowToast';
import {useSignOut} from "react-firebase-hooks/auth"
import useAuthStore from './AuthStore';


export default function UseLogOut() {
    const [signOut,isLoggingOut,error] = useSignOut(auth)
    const showToast = useShowToast()
    const logoutUser = useAuthStore(state => state.logout)
    const handleLogOut = async () => {
        try{
            await signOut()
            localStorage.removeItem("user-info")
            showToast("Succesfully","","success")
            logoutUser()
        }catch(error){
            showToast("Error",error.message,"error")
        }
    }
  return {handleLogOut,isLoggingOut,error}
}
