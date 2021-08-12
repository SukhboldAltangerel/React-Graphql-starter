import Home from 'pages/home/home'
import Login from 'pages/login/login'
import SignUp from 'pages/signUp/signUp'
import React from 'react'
import { Switch, Route, useLocation } from 'react-router-dom'
import { useTransition, animated } from 'react-spring'
import styles from './router.module.css'

export default function Router() {
   const location = useLocation()

   const routesTransition = useTransition(location, {
      from: { opacity: 0, transform: 'scale(0.90)' },
      enter: { opacity: 1, transform: 'scale(1)', delay: 200 },
      leave: { opacity: 0, transform: 'scale(0.90)' },
      config: { clamp: true },
   })

   return routesTransition((anims, item) =>
      <animated.div className={styles.animatedRoute} style={anims}>
         <Switch location={item}>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/sign-up" component={SignUp} />
         </Switch>
      </animated.div>
   )
}
