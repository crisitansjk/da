import React, { useState } from 'react'
import { render } from 'react-dom'
import useShowToast from './useShowToast'

export default function usePreviewImg() {
    const [selectedFile,setSelectedFile] = useState(null)
    const showToast = useShowToast()
    const maxFileSizing = 2 * 1024 * 1024

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if(file && file.type.startsWith("image/")){
            if(file.size > maxFileSizing){
                setSelectedFile(null)
                return
            }
            const reader = new FileReader()
            reader.onloadend = () => {
                setSelectedFile(reader.result)
            }
            reader.readAsDataURL(file)
        }else{
            setSelectedFile(null)
        }


    }
  return {selectedFile,setSelectedFile,handleImageChange}
}
