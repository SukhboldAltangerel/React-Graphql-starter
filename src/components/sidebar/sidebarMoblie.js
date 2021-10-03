import React, { useEffect, useRef, useState } from 'react'
import styles from './sidebarMobile.module.css'
import { expandedWidth, sidebarItems } from 'components/sidebar/sidebar'
import { Transition, animated } from 'react-spring'
import SidebarItem from 'components/sidebar/sidebarItem'
import useClickOutside from 'utilities/hooks/useClickOutside'
import { HiMenu } from 'react-icons/hi'
import SidebarItemNested from './sidebarItemNested'
import { useContext } from 'react/cjs/react.development'
import UserContext from 'utilities/contexts/user.context'
import AlertContext from 'utilities/contexts/alert.context'

export default function SideBarMobile() {
   const userCtx = useContext(UserContext)
   const alertCtx = useContext(AlertContext)

   const [open, setOpen] = useState(false)
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

   const sidebarRef = useRef()

   function handleOpen() {
      setOpen(true)
   }

   function handleClose() {
      setOpen(false)
   }

   useClickOutside([sidebarRef], open, handleClose)

   return (
      <Transition
         items={open}
         from={{ width: 0, padding: '32px 0px' }}
         enter={{ width: expandedWidth, padding: '32px 8px' }}
         leave={{ width: 0, padding: '32px 0px' }}
         config={{ clamp: true }}
      >
         {(anims, item) => item ?
            <animated.div className={styles.sidebar} style={anims} ref={sidebarRef}>
               {sidebarItems.map(item => item.subItems
                  ? <SidebarItemNested sidebarItem={item} expanded={true} key={item.label} />
                  : <SidebarItem sidebarItem={item} expanded={true} key={item.label} />
               )}
            </animated.div>
            : <HiMenu className={styles.menuIcon} onClick={handleOpen} />
         }
      </Transition>
   )
}
