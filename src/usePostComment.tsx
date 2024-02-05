import React, { useState } from 'react'
import useAuthStore from './AuthStore'
import { firestore } from './firebase'
import usePostStore from './postStore'
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

const usePostComment = () => {
  const [isCommenting,setIsCommenting] = useState(false)
  const authUser = useAuthStore(state=>state.user)
  const addComment = usePostStore(state=>state.addComment)

  const handlePostComment = async(postId,comment) => {
    if(isCommenting) return
    if(!authUser) return 
    setIsCommenting(true)
    const newComment = {
        comment,
        createAt:Date.now(),
        createdBy:authUser.uid,
        postId,
    }
    try{
        await updateDoc(doc(firestore,"posts",postId),{
            comments:arrayUnion(newComment)
        })
        addComment(postId,newComment)
    }catch(error){

    }finally{
        setIsCommenting(false)

    }

  }
  return {isCommenting,handlePostComment}
}

export default usePostComment