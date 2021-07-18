import React, { useContext, useRef } from 'react'
import ModalContext from 'utilities/modal.context'
import useClickOutside from 'utilities/useClickOutside'
import styles from './modal.module.css'
import { Transition, animated } from 'react-spring'

export default function Modal() {
   const modalCtx = useContext(ModalContext)
   const modalOpen = modalCtx.modal.open

   const contentContainerRef = useRef()

   function handleCloseModal() {
      modalCtx.setModal(prev => ({ ...prev, open: false }))
   }

   useClickOutside([contentContainerRef], modalOpen, handleCloseModal)

   return (
      <Transition
         items={modalOpen}
         from={{ opacity: 0, backdropFilter: 'blur(0px)', transform: 'translateY(-20px) scale(0.4)' }}
         enter={{ opacity: 1, backdropFilter: 'blur(4px)', transform: 'translateY(0px) scale(1)' }}
         leave={{ opacity: 0, backdropFilter: 'blur(0px)', transform: 'translateY(20px) scale(0.4)' }}
         config={{ clamp: true }}
      >
         {(anims, item) => item &&
            <>
               <animated.div className={styles.background} style={{ opacity: anims.opacity, backdropFilter: anims.backdropFilter }} />
               <div className={styles.modalContainer}>
                  <animated.div className={styles.contentContainer} style={{ transform: anims.transform, opacity: anims.opacity }} ref={contentContainerRef}>
                     {modalCtx.modal.content}
                  </animated.div>
               </div>
            </>
         }
      </Transition>
   )
}
