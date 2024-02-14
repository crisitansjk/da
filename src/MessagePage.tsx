import { useRef, useState } from 'react'
import {Flex,Avatar,Text,Input,Button,Box,Image} from '@chakra-ui/react'
import useGetFriendsMess from './useGetFriendsMess'

import useAuthStore from './AuthStore'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { BsFillImageFill } from "react-icons/bs";




  

import useCreateMessageStore from './useCreateMessageStore'
import useGetMessages from './useGetMessages'
import useNotificationBackend from './useNotificationBackend'
export default function MessagePage() {

    const scrl = useRef()
    const [userr,setUserr] = useState(null)
    const [textt,setTextt] = useState(null) 
    const curr = useRef()
    const {dumss,datas} = useGetMessages()
    const {friendClient} =   useGetFriendsMess()
    const {handle,clickFu,exist} = useCreateMessageStore()
    const userAuth = useAuthStore(state=>state.user)
    const [datar,setdata] = useState(null)
    const [ac,setac] = useState(false)
    const [da,setda] = useState(false)
    const [type,setType] = useState(true)
    const {aba} = useNotificationBackend()
    const [file,setFile] = useState(null)
    const imageChoose = useRef(null)
    const [ChooseImage,setChooseImg] = useState(false)

   
    

   

    const sc = () =>{

    setTimeout(()=>{

        const da = scrl.current.clientHeight

        scrl.current.scrollTo(0,da*30)

        setTextt(null)

    },400)}
   
   setTimeout(()=>{
        setda(!da)
        
   },100)
   clearTimeout()

   const changeImg = (e) =>{
    const maxFileSizing = 2 * 1024 * 1024
    const file = e.target.files[0]
        if(file && file.type.startsWith("image/")){
            if(file.size > maxFileSizing){
                setFile(null)
                return
            }
            const reader = new FileReader()
            reader.onloadend = () => {
                setFile(reader.result)
                console.log(reader.result)
            }
            reader.readAsDataURL(file)
        }else{
            setFile(null)
        }
   
    
			
     
   }
   
  

if(window.innerWidth > 479){
            return (
          
              <Flex w={"full"} 
                 
                    h={"full"} 
                    overflow={"hidden"}
                    bg={"gray.900"}  >
                
                  <Flex  w={"25%"} 
                         bg={"blue.900"}  
                         direction={"column"} 
                         display={{base:"none",sm:"flex"}}
                          
                         justifyContent={"center"} 
                         gap={10} 
                         
                         align={"start"}>

                      <Flex direction={"column"} 
                            mt={"15%"} 
                            ml={"10%"} 
                            
                            w={"80%"} 
                            h={"full"} 
                            gap={2}  overflowY={"scroll"}>
                      
                      {friendClient && (friendClient.map((item)=>{
                        

                             return (

                             <Flex key={item.uid} 
                                   
                                   
                                   direction={"row"} 
                                   w={"full"} 
                                   border={"1px solid gray"} 
                                   borderRadius={"10px"} 
                                   overflow={"hidden"} 
                                   onClick={async()=>{handle(item),setUserr(item),await dumss(item)}} 
                                   justifyContent={"flex-start"} 
                                   align={"center"}>
                                  
                                  <Avatar src={item.profilePicURL} m={2}  size={"sm"}/>
                                  <Text ml={"5%"}>{item.username}</Text>

                              </Flex>)
})
                      )}
                      </Flex>

                  </Flex>

                  <Flex p={10}  
                        w={"100%"} 
                        h={"95%"}    
                        display={"flex"}
                        justifyContent={"start"} 
                        align={"center"} 
                        direction={"column"} >

                    <Flex direction={"column"} 
                    m={30}
                       
                          w={"full"}  
                          h={{base:"100%",sm:"100%"}} 
                     
                          overflowX={"hidden"} 
                          overflowY={"scroll"}   
                         
                          ref={scrl}>

                        <Box h={"sm"} >

                    {datas && datas.map(item=>{
                       
                        let dat = new Date()

                        let da = new Date(dat.getTime() -item.createdAt)
                        
                       if(item.expeditor !== userAuth.uid){
                       
                            return <Flex w={"full"} 
                                         bg={""} 
                                         gap={1}
                                         
                                         direction={"relative"} m={1}  
                                         justifyContent={"flex-end"} 
                                         
                                         aling={"left"}>
                                            {item.createdAt == datar && ac == true ? <Text fontSize={"xs"} m={1} color={"grey"}> {timeAgo.format(Number(new Date(item.createdAt)))}</Text>:null} 
                                            <Text  color=""  onClick={()=>{setdata(item.createdAt),setac(!ac)}}  mr={5}>{item.text}</Text>
                                            {item.imageConv && <Image w={"xs"}  src={item.imageConv}/>}
                                            {item.creatorImg && <Avatar size={"xs"} mr={5} src={item.creatorImg}/>}
                                    </Flex>
                       
                        }else{

                            return <Flex w={"full"} 
                            >
                              
                              
                              
                               <Text color="" 
                                         ml={5} onClick={()=>{setdata(item.createdAt),setac(!ac)}} >
                                          
                                            {item.creatorImg && <Avatar size={"xs"} mr={5} src={item.creatorImg}/>}{item.text}
                                    </Text>
                                    {item.createdAt == datar && ac == true ? <Text fontSize={"xs"} m={1} color={"grey"}> {timeAgo.format(Number(new Date(item.createdAt)))}</Text>:null} 
                       </Flex>
                       }  
                        
                    })}
                    </Box>
                    </Flex>

                    <Flex w={"full"} 
                          position={"relative"} 
                          h={"5%"} 
                          justify={"center"} 
                          align={"center"}>


                  <Input type="text" 
                         placeholder='name' 
                         ref={curr}   
                         onChange={(e)=>{setTextt(e.target.value)}}/>

                  <Button
                  colorScheme='teal'
                  type='submit' onClick={async()=>{if(textt){clickFu(userr,textt,file),curr.current.value="",await dumss(userr),sc(),await aba(exist,userr)}}} >
                  Submit
                  </Button>
             
                  </Flex>

                  <Flex justify={"center"} align={"center"} gap={3} m={4}>

                  <Input type="file" hidden onChange={changeImg} ref={imageChoose}/>
                  
                  <BsFillImageFill
                        onClick={()=>{imageChoose.current.click(),setChooseImg(true)}}
							style={{cursor: "pointer" }}
							size={16}
                            color={file ? "red":"white"}
						/>

                  <Button onClick={()=>setFile(null)} size={"xs"}>close</Button>

                  </Flex>

                  {file && <Image src={file} h={"3xs"}/>}
                  
                  </Flex>
                  
              </Flex>

            )
        
            

    }else{
        return (
          
            <Flex w={"full"} 
               
                  h={"full"} 
                  overflow={"hidden"}
                  bg={"gray.900"}  >

             {type && 
                
                <Flex  w={"100%"} 
                       bg={"blue.900"}  
                       direction={"column"} 
                      
                        
                       justifyContent={"center"} 
                       gap={10} 
                       
                       align={"start"}>

                    <Flex direction={"column"} 
                          mt={"15%"} 
                          ml={"10%"} 
                          
                          w={"80%"} 
                          h={"full"} 
                          gap={2}  overflowY={"scroll"}
                          >
                    
                    {friendClient && (friendClient.map((item)=>{
                      

                           return (

                           <Flex key={item.uid} 
                                 
                                 
                                 direction={"row"} 
                                 w={"full"} 
                                 border={"1px solid gray"} 
                                 borderRadius={"10px"} 
                                 overflow={"hidden"} 
                                 onClick={async()=>{handle(item),setUserr(item),await dumss(item),setType(!type),sc()}} 
                                 justifyContent={"flex-start"} 
                                 align={"center"}>
                                
                                <Avatar src={item.profilePicURL} m={2}  size={"sm"}/>
                                <Text ml={"5%"}>{item.username}</Text>

                            </Flex>)
})
                    )}
                    </Flex>

                </Flex>}

                {!type &&

                <Flex p={10}  
                      w={"100%"} 
                      h={"95%"}    
                      display={"flex"}
                      justifyContent={"start"} 
                      align={"center"} 
                      direction={"column"} >
<Button onClick={()=>setType(!type)} w={"full"}>exit</Button>
                  <Flex direction={"column"} 
                  m={30}
                     
                        w={"full"}  
                        h={{base:"100%",sm:"100%"}} 
                   
                        overflowX={"hidden"} 
                        overflowY={"scroll"}   
                       
                        ref={scrl}>
                            
                    <Box h={"sm"}>

                  {datas && datas.map(item=>{
                     
                      let dat = new Date()

                      let da = new Date(dat.getTime() -item.createdAt)
                      
                     if(item.expeditor !== userAuth.uid){
                     
                          return <Flex w={"full"} 
                                       bg={""} 
                                       
                                       direction={"relative"} m={1}  
                                       justifyContent={"flex-end"} 
                                       aling={"left"}>
                                         {item.createdAt == datar && ac == true ? <Text fontSize={"xs"} m={1} color={"grey"}> {timeAgo.format(Number(new Date(item.createdAt)))}</Text>:null} 
                                         
                                          <Text  color=""  onClick={()=>{setdata(item.createdAt),setac(!ac)}}  mr={5}>{item.text}</Text>
                                          {item.creatorImg && <Avatar size={"xs"} mr={5} src={item.creatorImg}/>}
                                  </Flex>
                     
                      }else{

                          return <Flex w={"full"} 
                          >
                            
                            
                            
                             <Text color="" 
                                       ml={5} onClick={()=>{setdata(item.createdAt),setac(!ac)}} >
                                        
                                          {item.creatorImg && <Avatar size={"xs"} mr={5} src={item.creatorImg}/>}{item.text}
                                  </Text>
                                  {item.createdAt == datar && ac == true ? <Text fontSize={"xs"} m={1} color={"grey"}> {timeAgo.format(Number(new Date(item.createdAt)))}</Text>:null} 
                     </Flex>
                          
                     }  
                      
                  })}
                 
                  </Box>
                  </Flex>

                  <Flex w={"full"} 
                        position={"relative"} 
                        h={"5%"} 
                        
                        justify={"center"} 
                        align={"center"}>

                <Input type="text" 
                       placeholder='name' 
                       ref={curr}   
                       onChange={(e)=>{setTextt(e.target.value)}}/>

                <Button
                colorScheme='teal'
                type='submit' onClick={()=>{if(textt){clickFu(userr,textt),curr.current.value="",handle(userr),dumss(userr),sc(),aba(exist,userr)}}} >
                Submit
                </Button>

                </Flex>

                <Flex justify={"center"} align={"center"} gap={3} m={4}>

                  <Input type="file" hidden onChange={changeImg} ref={imageChoose}/>
                  
                  <BsFillImageFill
                        onClick={()=>{imageChoose.current.click(),setChooseImg(true)}}
							style={{cursor: "pointer" }}
							size={16}
                            color={file ? "red":"white"}
						/>

                  <Button onClick={()=>setFile(null)} size={"xs"}>close</Button>

                  </Flex>

                  {file && <Image src={file} h={"3xs"}/>}

                </Flex>
    }
            </Flex>

          )

    }

}
   

