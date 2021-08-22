import React, { useRef, useState } from 'react'
import styles from './sidebarMobile.module.css'
import { expandedWidth, sidebarItems } from 'components/sidebar/sidebar'
import { Transition, animated } from 'react-spring'
import SidebarItem from 'components/sidebar/sidebarItem'
import useClickOutside from 'utilities/hooks/useClickOutside'

export default function SideBarMobile() {
   const [open, setOpen] = useState(false)

   const sidebarRef = useRef()

   function handleClose() {
      setOpen(false)
   }

   useClickOutside([sidebarRef], open, handleClose)

   return (
      <Transition
         items={open}
         from={{ width: 0 }}
         enter={{ width: expandedWidth }}
         leave={{ width: 0 }}
         config={{ clamp: true }}
      >
         {(anims, item) => item ?
            <animated.div className={styles.sidebar} style={anims} ref={sidebarRef}>
               {sidebarItems.map(item =>
                  <SidebarItem sidebarItem={item} expanded={true} key={item.link} />
               )}
            </animated.div>
            : <span onClick={() => setOpen(true)}>
               Open
            </span>
         }
      </Transition>
   )
}
