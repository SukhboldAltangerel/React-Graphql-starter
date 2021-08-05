import React, { useContext, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import AlertContext from 'utilities/alert.context'
import { queryFetch } from 'utilities/fetch'
import { getUsersQuery, loginQuery, signUpQuery } from 'utilities/queries'
import styles from './login.module.css'
import Button from 'components/button/button'
import { Link } from 'react-router-dom'
import { Transition } from 'react-spring'

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
      onSuccess: data => {
         const errorMsg = data.extensions?.errorMsg
         errorMsg && alertCtx.setAlert({
            open: true,
            content: errorMsg
         })
      },
   })

   const [signUpForm, setSignUpForm] = useState({
      name: '',
      email: '',
      password: '',
      password2: ''
   })

   function handleChangeSignUp(key, value) {
      setSignUpForm(prev => ({ ...prev, [key]: value }))
   }

   const signUp = useMutation(() => {
      const { password2, ...args } = signUpForm
      return queryFetch(signUpQuery(args))
   }, {
      onSuccess: data => {
         const errorMsg = data.extensions?.errorMsg
         errorMsg && alertCtx.setAlert({
            open: true,
            content: errorMsg
         })
      }
   })

   return (
      <div className={styles.loginContainer}>
         <Transition
            items={true}
            from={{}}
            enter={{}}
            leave={{}}
            config={{ clamp: true }}
         >
            {(anims, item) => <div className={styles.loginModal}>
               <div className={styles.header}>
                  Тавтай морилно уу.
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
            </div>}
         </Transition>

         <div className={styles.loginModal}>
            <input type="text" placeholder="Нэр" value={signUpForm.name} onChange={e => handleChangeSignUp('name', e.target.value)} />
            <input type="text" placeholder="Имэйл" value={signUpForm.email} onChange={e => handleChangeSignUp('email', e.target.value)} />
            <input type="password" placeholder="Нууц үг" value={signUpForm.password} onChange={e => handleChangeSignUp('password', e.target.value)} />
            <input type="password" placeholder="Нууц үгээ дахин оруулна уу" value={signUpForm.password2} onChange={e => handleChangeSignUp('password2', e.target.value)} />
            <Button content="Бүртгүүлэх"
               onClick={signUp.mutate}
            />
         </div>
      </div>
   )
}
