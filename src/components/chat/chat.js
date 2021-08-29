import React, { useState } from 'react'
import styles from './chat.module.css'
import { Transition, animated } from 'react-spring'
import { HiOutlineChat } from 'react-icons/hi'

export default function Chat() {
   const [visible, setVisible] = useState(true)
   const [open, setOpen] = useState(false)
   const [messages, setMessages] = useState([{
      user: 'user 1',
      message: 'message 1'
   }])

   function toggleOpen() {
      setOpen(prev => !prev)
   }

   return (
      <>
         <Transition
            items={visible}
            from={{ transform: 'scale(0)' }}
            enter={{ transform: 'scale(1)' }}
            leave={{ transform: 'scale(0)' }}
         >
            {(anims, item) => item &&
               <animated.div className={styles.chatIconContainer} style={anims} onClick={toggleOpen}>
                  <HiOutlineChat className={styles.chatIcon} />
               </animated.div>
            }
         </Transition>

         <Transition
            items={visible && open}
            from={{ transform: 'scale(0)' }}
            enter={{ transform: 'scale(1)' }}
            leave={{ transform: 'scale(0)' }}
         >
            {(anims, item) => item &&
               <animated.div className={styles.chatContainer} style={anims}>
                  {messages.map((message, i) =>
                     <div className={styles.messageContainer} key={i}>
                        <span className={styles.user}>
                           {message.user}:
                        </span>
                        <span className={styles.message}>
                           {message.message}
                        </span>
                     </div>
                  )}
               </animated.div>
            }
         </Transition>
      </>
   )
}
