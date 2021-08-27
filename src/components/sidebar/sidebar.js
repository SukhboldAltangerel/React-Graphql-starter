import { Spring, animated } from 'react-spring'
import React, { useState } from 'react'
import styles from './sidebar.module.css'
import { HiHome, HiUserCircle, HiUserAdd } from 'react-icons/hi'
import SidebarItem from './sidebarItem'

const width = 36
export const expandedWidth = 180

export const sidebarItems = [{
   label: 'home',
   link: '/',
   icon: HiHome
}, {
   label: 'user',
   link: '/login',
   icon: HiUserCircle
}, {
   label: 'add user',
   link: '/sign-up',
   icon: HiUserAdd
}]

export default function Sidebar() {
   const [expanded, setExpanded] = useState(false)

   return (
      <Spring
         from={{ width: width }}
         to={{ width: expanded ? expandedWidth : width }}
      >
         {anims =>
            <animated.div className={styles.sidebar} style={anims} onClick={() => setExpanded(prev => !prev)}>
               {sidebarItems.map(item =>
                  <SidebarItem sidebarItem={item} expanded={expanded} key={item.link} />
               )}
            </animated.div>
         }
      </Spring>
   )
}
