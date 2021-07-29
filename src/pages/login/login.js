import React, { useContext, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import AlertContext from 'utilities/alert.context'
import { queryFetch } from 'utilities/fetch'
import getErrorMsg from 'utilities/getErrorMsg'
import { getUsersQuery, loginQuery } from 'utilities/queries'
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

   const users = useQuery('users', () => queryFetch(getUsersQuery))

   const login = useMutation(() => queryFetch(loginQuery(form)), {
      onSuccess: () => alertCtx.setAlert({ open: true, content: 'Амжилттай нэвтэрлээ.' }),
   })

   return (
      <div className={styles.loginContainer}>
         <div className={styles.loginModal}>
            <div className={styles.header}>
               Тавтай морилно уу.
            </div>
            <input type="text" className={styles.textField} value={form.email} onChange={e => handleChange('email', e.target.value)} placeholder="Имэйл хаяг" />
            <input type="password" className={styles.textField} value={form.password} onChange={e => handleChange('password', e.target.value)} placeholder="Нууц үг" />
            <div className={styles.buttonContainer}>
               <button className={styles.button} onClick={login.mutate}>
                  Нэвтрэх
               </button>
            </div>
         </div>
      </div>
   )
}
