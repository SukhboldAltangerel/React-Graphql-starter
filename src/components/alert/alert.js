import React, { useContext, useEffect } from 'react'
import AlertContext from 'utilities/alert.context'
import styles from './alert.module.css'
import { Transition, animated } from 'react-spring'

export default function Alert() {
   const alertCtx = useContext(AlertContext)
   const alert = alertCtx.alert

   function handleCloseAlert() {
      alertCtx.setAlert(prev => ({ ...prev, open: false }))
   }

   useEffect(() => {
      const timer = setTimeout(() => {
         if (alert.open === true) handleCloseAlert()
      }, 3000)
      return () => clearTimeout(timer)
   }, [alert])

   return (
      <Transition
         items={alert.open}
         from={{ opacity: 0, transform: 'scale(0.4)' }}
         enter={{ opacity: 1, transform: 'scale(1)' }}
         leave={{ opacity: 0, transform: 'scale(0.4)' }}
         config={{ clamp: true }}
      >
         {(anims, item) => item &&
            <div className={styles.alertContainer}>
               <animated.div className={styles.alertDialog} style={anims} onClick={handleCloseAlert}>
                  {alertCtx.alert.content}
               </animated.div>
            </div>
         }
      </Transition>
   )
}
