import React, { useContext, useEffect, useRef, useState } from 'react'
import styles from './chat.module.css'
import { Transition, animated } from 'react-spring'
import { HiOutlineChat } from 'react-icons/hi'
import { baseSocket } from 'utilities/baseUrl'
import { createClient } from 'graphql-ws'
import { useMutation, useQuery } from 'react-query'
import { queryFetch } from 'utilities/fetch'
import AlertContext from 'utilities/contexts/alert.context'
import { sendMessageMutation } from 'utilities/graphql/mutations'
import { chatSub } from 'utilities/graphql/subscriptions'
import { getChatQuery } from 'utilities/graphql/queries'
import UserContext from 'utilities/contexts/user.context'

const client = createClient({
   url: baseSocket
})

export default function Chat() {
   const alertCtx = useContext(AlertContext)
   const userCtx = useContext(UserContext)

   const userId = userCtx.user?.id

   const [visible, setVisible] = useState(true)
   const [open, setOpen] = useState(false)
   const [chat, setChat] = useState([])
   const [message, setMessage] = useState('')

   const chatQuery = useQuery('chat', () => queryFetch(getChatQuery), {
      enabled: false,
      onSuccess: data => {
         setChat(data.data?.getChatRedis)
      },
      onError: err => {
         alertCtx.setAlert({
            open: true,
            content: 'Чатыг татаж чадсангүй.'
         })
      }
   })

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
      setOpen(prev => {
         !prev && setTimeout(() => {
            chatSectionRef.current && chatSectionRef.current.scroll({
               top: chatSectionRef.current.scrollHeight,
               behavior: 'smooth'
            })
         }, 10)
         return !prev
      })
   }

   useEffect(() => {
      chatQuery.refetch()
      client.subscribe({
         query: chatSub,
      }, {
         next: data => {
            setChat(prev => [...prev, data.data?.chatSub])
            chatSectionRef.current && chatSectionRef.current.scrollBy({
               top: 46,
               behavior: 'smooth'
            })
         }
      })
   }, [])

   const chatSectionRef = useRef()

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
            from={{ transform: 'scale(0.8)', opacity: 0 }}
            enter={{ transform: 'scale(1)', opacity: 1 }}
            leave={{ transform: 'scale(0.8)', opacity: 0 }}
         >
            {(anims, item) => item &&
               <animated.div className={styles.chatContainer} style={anims}>
                  <div className={styles.chatsSection} ref={chatSectionRef}>
                     {chat.map((message, i) =>
                        userId === message.userId
                           ? <div className={styles.messageContainerSelf} key={i}>
                              <span className={styles.messageSelf}>
                                 {message.message}
                              </span>
                           </div>
                           : <div className={styles.messageContainer} key={i}>
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
