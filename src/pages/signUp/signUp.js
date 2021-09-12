import React, { useContext, useState } from 'react'
import { useMutation } from 'react-query'
import AlertContext from 'utilities/contexts/alert.context'
import { queryFetch } from 'utilities/fetch'
import { signUpQuery } from 'utilities/graphql/mutations'
import loginStyles from '../login/login.module.css'
import Button from 'components/button/button'
import styles from './signUp.module.css'
import { Link, useHistory } from 'react-router-dom'

export default function SignUp() {
   const alertCtx = useContext(AlertContext)
   const history = useHistory()

   const [form, setForm] = useState({
      name: '',
      email: '',
      password: '',
      password2: ''
   })

   function handleChange(key, value) {
      setForm(prev => ({ ...prev, [key]: value }))
   }

   const signUp = useMutation(() => {
      const { password2, ...args } = form
      return queryFetch(signUpQuery(args))
   }, {
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
            content: data.data.signUp.message
         })
         localStorage.setItem('token', data.data.signUp.token)
         history.push('/')
      }
   })

   const handleSignUp = () => {
      if (form.password !== form.password2) {
         alertCtx.setAlert({
            open: true,
            content: 'Нууц үгүүд зөрж байна.'
         })
      }
      signUp.mutate()
   }

   return (
      <div className={loginStyles.loginContainer}>
         <div className={loginStyles.loginModal}>
            <div className={loginStyles.header}>
               Шинэ хэрэглэгч бүртгүүлэх
            </div>

            <input type="text" className={loginStyles.textField} placeholder="Нэр" value={form.name} onChange={e => handleChange('name', e.target.value)} />
            <input type="text" className={loginStyles.textField} placeholder="Имэйл" value={form.email} onChange={e => handleChange('email', e.target.value)} />
            <input type="password" className={loginStyles.textField} placeholder="Нууц үг" value={form.password} onChange={e => handleChange('password', e.target.value)} />
            <input type="password" className={loginStyles.textField} placeholder="Нууц үгээ дахин оруулна уу" value={form.password2} onChange={e => handleChange('password2', e.target.value)} />

            <div className={loginStyles.buttonContainer}>
               <Button
                  buttonStyle={styles.buttonStyle}
                  children="Бүртгүүлэх"
                  onClick={handleSignUp}
               />
            </div>

            <div className={loginStyles.singUpContainer}>
               Бүртгэлтэй хэрэглэгч бол <Link to="/login" className={styles.signUpLink}>энд дарж нэвтэрч орно уу</Link>
            </div>
         </div>
      </div>
   )
}
