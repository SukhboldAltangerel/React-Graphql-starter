import React, { useRef, useState } from 'react'
import styles from './sidebarMobile.module.css'
import { expandedWidth, sidebarItems } from 'components/sidebar/sidebar'
import { Transition, animated } from 'react-spring'
import SidebarItem from 'components/sidebar/sidebarItem'
import useClickOutside from 'utilities/hooks/useClickOutside'
import { HiMenu } from 'react-icons/hi'

export default function SideBarMobile() {
   const [open, setOpen] = useState(false)

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
               {sidebarItems.map(item =>
                  <SidebarItem sidebarItem={item} expanded={true} key={item.link} />
               )}
            </animated.div>
            : <HiMenu className={styles.menuIcon} onClick={handleOpen} />
         }
      </Transition>
   )
}
