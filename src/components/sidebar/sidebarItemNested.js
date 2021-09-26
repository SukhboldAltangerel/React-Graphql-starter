import React from 'react'
import stylesNested from './sidebarItemNested.module.css'
import styles from './sidebarItem.module.css'
import { Transition, animated } from 'react-spring'
import { useState } from 'react/cjs/react.development'
import SidebarItem from './sidebarItem'

export default function SidebarItemNested({ sidebarItem, expanded }) {
   const [open, setOpen] = useState(false)

   function handleToggle(e) {
      e.stopPropagation()
      setOpen(prev => !prev)
   }

   const subItems = sidebarItem.subItems ?? []

   return (
      <div className="">
         <div className={`${styles.sidebarItem} ${stylesNested.sidebarItem}`} onClick={handleToggle}>
            <sidebarItem.icon className={styles.icon} />
            <Transition
               items={expanded}
               from={{ opacity: 0 }}
               enter={{ opacity: 1 }}
               leave={{ opacity: 0 }}
               config={{ clamp: true }}
            >
               {(anims, item) => item &&
                  <animated.span className={styles.label} style={anims}>
                     {sidebarItem.label}
                  </animated.span>
               }
            </Transition>
         </div>

         <Transition
            items={open}
            from={{ height: 0, opacity: 0 }}
            enter={{ height: subItems.length * 44, opacity: 1 }}
            leave={{ height: 0, opacity: 0 }}
            config={{ clamp: true }}
         >
            {(anims, item) => item &&
               <animated.div className={stylesNested.subItemsContainer} style={anims}>
                  {subItems.map(subItem =>
                     <SidebarItem sidebarItem={subItem} expanded={expanded} key={subItem.label} />
                  )}
               </animated.div>
            }
         </Transition>
      </div>
   )
}
