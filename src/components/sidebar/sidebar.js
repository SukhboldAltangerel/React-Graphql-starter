import { Spring, animated } from 'react-spring'
import React, { useState } from 'react'
import styles from './sidebar.module.css'

export default function Sidebar() {
   const [open, setOpen] = useState(false)

   return (
      <Spring
         from={{ width: 0 }}
         to={{ width: open ? 400 : 60 }}
      >
         {anims =>
            <animated.div className={styles.sidebar} style={anims} onClick={() => setOpen(prev => !prev)}>

            </animated.div>
         }
      </Spring>
   )
}
