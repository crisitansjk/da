import React from 'react'
import CreatePost from './CreatePost'
import HomeS from './HomeS'
import Notification from './Notification'
import ProfileLink from './ProfileLink'
import Search from './Search'

export default function SidebarItems() {
  return (
    <>
     <HomeS/>
     <Search/>
     <Notification/>
     <CreatePost/>
     <ProfileLink/>
    </>
    
  )
}
