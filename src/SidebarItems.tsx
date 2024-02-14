
import CreatePost from './CreatePost'
import HomeS from './HomeS'
import MessageLink from './MessageLink'
import Notification from './Notification'
import ProfileLink from './ProfileLink'
import Search from './Search'

export default function SidebarItems({actv}) {
  return (
    <>
     <HomeS actv={actv}/>
     <Search actv={actv}/>
     <Notification actv={actv}/>
     <MessageLink actv={actv}/>
     <CreatePost actv={actv}/>
     <ProfileLink actv={actv}/>
    </>
    
  )
}
