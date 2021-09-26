import React, { useContext, useState } from 'react'
import { useMutation } from 'react-query'
import AlertContext from 'utilities/contexts/alert.context'
import { queryFetch } from 'utilities/fetch'
import { loginQuery } from 'utilities/graphql/mutations'
import styles from './login.module.css'
import Button from 'components/button/button'
import { Link, useHistory } from 'react-router-dom'
import UserContext from 'utilities/contexts/user.context'

export default function Login() {
   const alertCtx = useContext(AlertContext)
   const userCtx = useContext(UserContext)
   const history = useHistory()

   const [form, setForm] = useState({
      email: '',
      password: ''
   })

   function handleChange(key, value) {
      setForm(prev => ({ ...prev, [key]: value }))
   }

   const login = useMutation(() => queryFetch(loginQuery(form)), {
      onSuccess: data => {
         const errorMsg = data.extensions?.errorMsg
         if (errorMsg) {
            alertCtx.setAlert({
               open: true,
               content: errorMsg
            })
            return
         }
         alertCtx.setAlert({
            open: true,
            content: data.data.loginUser.message
         })
         const userData = data.data.loginUser ?? {}
         localStorage.setItem('token', userData.token)
         userCtx.setUser({
            id: userData.id,
            name: userData.name,
            email: userData.email
         })
         history.push('/')
      },
   })

   return (
      <div className={styles.loginContainer}>
         <div className={styles.loginModal}>
            <div className={styles.header}>
               Тавтай морилно уу
            </div>

            <input type="text" className={styles.textField} value={form.email} onChange={e => handleChange('email', e.target.value)} placeholder="Имэйл хаяг" />
            <input type="password" className={styles.textField} value={form.password} onChange={e => handleChange('password', e.target.value)} placeholder="Нууц үг" />
            <Link to="/" className={styles.forgotPassLink}>
               Нууц үгээ мартсан
            </Link>

            <div className={styles.buttonContainer}>
               <Button
                  buttonStyle={styles.buttonStyle}
                  children='Нэвтрэх'
                  onClick={login.mutate}
               />
            </div>

            <div className={styles.singUpContainer}>
               Бүртгэл үүсгээгүй бол <Link to="/sign-up" className={styles.signUpLink}>энд дарж бүртгүүлнэ үү</Link>
            </div>
         </div>
      </div>
   )
}
