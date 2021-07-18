import React, { useContext, useState } from 'react'
import AlertContext from 'utilities/alert.context'
import argsGql from 'utilities/argsGql'
import useMutation from 'utilities/useMutation'
import useQuery from 'utilities/useQuery'
import styles from './login.module.css'

export default function Login() {
   const alertCtx = useContext(AlertContext)

   const [form, setForm] = useState({
      email: '',
      password: ''
   })

   function handleChange(key, value) {
      setForm(prev => ({ ...prev, [key]: value }))
   }

   const getUserQuery = useQuery({
      gql: getUsersGql,
      initData: [],
      cache: true
   })

   const loginMutation = useMutation({
      gql: loginGql(form)
   })

   //Try React Query much better!

   return (
      <div className={styles.loginContainer}>
         <div className={styles.loginModal}>
            <div className={styles.header}>
               Тавтай морилно уу.
            </div>
            <input type="text" className={styles.textField} value={form.email} onChange={e => handleChange('email', e.target.value)} placeholder="Имэйл хаяг" />
            <input type="password" className={styles.textField} value={form.password} onChange={e => handleChange('password', e.target.value)} placeholder="Нууц үг" />
            <div className={styles.buttonContainer}>
               <button className={styles.button} onClick={loginMutation.callback}>
                  Нэвтрэх
               </button>
            </div>
         </div>
      </div>
   )
}

const getUsersGql = `
   {
      getUsers {
      id
      name
      email
      password
      }
   } 
`

const loginGql = (args) => `
   mutation {
      loginUser(${argsGql(args)}) {
      success
      message
      }
   }
`
