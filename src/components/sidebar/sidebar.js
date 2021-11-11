import { Spring, animated } from 'react-spring'
import React, { useEffect, useState } from 'react'
import styles from './sidebar.module.css'
import { HiHome, HiUserCircle, HiUserAdd, HiOutlineLogin, HiOutlineLogout, HiOutlineDocumentReport } from 'react-icons/hi'
import SidebarItem from './sidebarItem'
import SidebarItemNested from './sidebarItemNested'
import { useContext } from 'react/cjs/react.development'
import UserContext from 'utilities/contexts/user.context'
import AlertContext from 'utilities/contexts/alert.context'
import { RiFolderUploadFill } from 'react-icons/ri'

const width = 40
export const expandedWidth = 180

export const sidebarItems = [{
   label: 'Нүүр',
   link: '/',
   icon: HiHome
}, {
   label: 'Хэрэглэгч',
   icon: HiUserCircle,
   subItems: [{
      label: 'Нэвтрэх',
      link: '/login',
      icon: HiOutlineLogin
   }, {
      label: 'Бүртгүүлэх',
      link: '/sign-up',
      icon: HiUserAdd
   }, {
      label: 'Гарах',
      link: '/',
      action: () => { },
      icon: HiOutlineLogout
   }]
}, {
   label: 'Файл хадгалах',
   link: '/file-upload',
   icon: RiFolderUploadFill
}, {
   label: 'Тест',
   link: '/test',
   icon: HiOutlineDocumentReport
}]

export default function Sidebar() {
   const userCtx = useContext(UserContext)
   const alertCtx = useContext(AlertContext)

   const [expanded, setExpanded] = useState(false)
   const [sidebarItemsInjected, setSidebarItemsInjected] = useState(sidebarItems)

   useEffect(() => {
      setSidebarItemsInjected(prev => {
         const next = [...prev]
         next[1].subItems[2].action = logOut
         return next
      })
   }, [])

   function logOut() {
      if (userCtx.user.id === undefined) {
         alertCtx.setAlert({
            open: true,
            content: 'Хэрэглэгч нэвтрээгүй байна.'
         })
      } else {
         localStorage.clear()
         userCtx.setUser({})
         alertCtx.setAlert({
            open: true,
            content: 'Хэрэглэгч гарлаа.'
         })
      }
   }

   return (
      <Spring
         from={{ width: width }}
         to={{ width: expanded ? expandedWidth : width }}
      >
         {anims =>
            <animated.div className={styles.sidebar} style={anims} onClick={() => setExpanded(prev => !prev)}>
               {sidebarItemsInjected.map(item => item.subItems
                  ? <SidebarItemNested sidebarItem={item} expanded={expanded} key={item.label} />
                  : <SidebarItem sidebarItem={item} expanded={expanded} key={item.label} />
               )}
            </animated.div>
         }
      </Spring>
   )
}
