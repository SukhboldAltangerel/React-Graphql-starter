import React, { useContext, useEffect, useState } from 'react'
import styles from './chat.module.css'
import { Transition, animated } from 'react-spring'
import { HiOutlineChat } from 'react-icons/hi'
// import { io } from 'socket.io-client'
import { baseSocket } from 'utilities/baseUrl'
import { createClient } from 'graphql-ws'
import { useMutation, useQuery } from 'react-query'
import { queryFetch } from 'utilities/fetch'
import AlertContext from 'utilities/contexts/alert.context'
import { sendMessageMutation } from 'utilities/graphql/mutations'
import { chatSub } from 'utilities/graphql/subscriptions'
import { getChat } from 'utilities/graphql/queries'

const client = createClient({
   url: baseSocket
})

// const socket = io(baseSocket, {
//    withCredentials: true,
//    transports: ['websocket']
// })

export default function Chat() {
   const alertCtx = useContext(AlertContext)

   const [visible, setVisible] = useState(true)
   const [open, setOpen] = useState(false)

   const [message, setMessage] = useState('')
   const chat = useQuery('chat', queryFetch(getChat))

   function changeMessage(value) {
      setMessage(value)
   }

   const sendMessage = useMutation(() => {
      const args = { message: message }
      return queryFetch(sendMessageMutation(args))
   }, {
      onSuccess: data => {
         setMessage('')
      },
      onError: err => {
         alertCtx.setAlert({
            open: true,
            content: 'Чатыг илгээж чадсангүй.'
         })
      }
   })

   function listenKeyMessage(e) {
      if (e.key === 'Enter') {
         sendMessage.mutate()
      }
   }

   function toggleOpen() {
      setOpen(prev => !prev)
   }

   useEffect(() => {
      client.subscribe({
         query: chatSub,
      }, {
         next: (data) => {
            console.log('data', data)
         },
         error: (error) => {
            console.error('error', error)
         },
         complete: () => {
            console.log('no more greetings')
         },
      }
      )
   }, [])

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
                  <div className={styles.chatsSection}>
                     {chat.map((message, i) =>
                        <div className={styles.messageContainer} key={i}>
                           <span className={styles.name}>
                              {message.name}:
                           </span>
                           <span className={styles.message}>
                              {message.message}
                           </span>
                        </div>
                     )}
                  </div>
                  <div className={styles.messageInputSection}>
                     <input className={styles.messageInput} value={message} onChange={e => changeMessage(e.target.value)} onKeyDown={listenKeyMessage} />
                  </div>
               </animated.div>
            }
         </Transition>
      </>
   )
}
