import React, { useContext, useState } from 'react'
import { useMutation } from 'react-query'
import AlertContext from 'utilities/alert.context'
import { queryFetch } from 'utilities/fetch'
import { loginQuery } from 'utilities/queries'
import styles from './login.module.css'
import Button from 'components/button/button'
import { Link } from 'react-router-dom'

export default function Login() {
   const alertCtx = useContext(AlertContext)

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
         errorMsg && alertCtx.setAlert({
            open: true,
            content: errorMsg
         })
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
                  content='Нэвтрэх'
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
