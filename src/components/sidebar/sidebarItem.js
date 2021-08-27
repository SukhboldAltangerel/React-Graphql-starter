import React from 'react'
import { Link } from 'react-router-dom'
import { Transition, animated } from 'react-spring'
import styles from './sidebarItem.module.css'

export default function SidebarItem({ sidebarItem, expanded }) {
   function handleClick(e) {
      e.stopPropagation()
   }

   return (
      <Link className={styles.link} to={sidebarItem.link} onClick={handleClick}>
         <div className={styles.sidebarItem}>
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
      </Link>
   )
}
