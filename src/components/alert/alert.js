import React, { useContext, useEffect } from 'react'
import AlertContext from 'utilities/alert.context'
import styles from './alert.module.css'
import { Transition, animated } from 'react-spring'

export default function Alert() {
   const alertCtx = useContext(AlertContext)
   const alertOpen = alertCtx.alert.open

   function handleCloseAlert() {
      alertCtx.setAlert(prev => ({ ...prev, open: false }))
   }

   useEffect(() => {
      const timer = setTimeout(() => {
         if (alertOpen === true) handleCloseAlert()
      }, 3000)
      return () => clearTimeout(timer)
   }, [alertOpen])

   return (
      <Transition
         items={alertOpen}
         from={{ opacity: 0, transform: 'scale(0.4)' }}
         enter={{ opacity: 1, transform: 'scale(1)' }}
         leave={{ opacity: 0, transform: 'scale(0.4)' }}
         config={{ clamp: true }}
      >
         {(anims, item) => item &&
            <animated.div className={styles.alertContainer} style={anims} onClick={handleCloseAlert}>
               {alertCtx.alert.content}
            </animated.div>
         }
      </Transition>
   )
}
