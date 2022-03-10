import CssDoodle from 'pages/cssDoodle/cssDoodle'
import FileUpload from 'pages/fileUpload/fileUpload'
import Home from 'pages/home/home'
import Jotai from 'pages/jotai/jotai'
import Login from 'pages/login/login'
import Recoil from 'pages/recoil/recoil'
import Shepherd from 'pages/shepherd/shepherd'
import SignUp from 'pages/signUp/signUp'
import Three from 'pages/three/three'
import Zustand from 'pages/zustand/zustand'
import { Route, Switch, useLocation } from 'react-router-dom'
import { animated, useTransition } from 'react-spring'
import styles from './router.module.css'

export default function Router() {
   const location = useLocation()

   const routesTransition = useTransition(location, {
      from: { opacity: 0, transform: 'scale(0.90)' },
      enter: { opacity: 1, transform: 'scale(1)', delay: 100 },
      leave: { opacity: 0, transform: 'scale(0.90)' },
      config: { clamp: true },
   })

   return routesTransition((anims, item) =>
      <animated.div className={styles.animatedRoute} style={anims}>
         <Switch location={item}>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/file-upload" component={FileUpload} />
            <Route path="/recoil" component={Recoil} />
            <Route path="/three" component={Three} />
            <Route path="/css-doodle" component={CssDoodle} />
            <Route path="/zustand" component={Zustand} />
            <Route path="/jotai" component={Jotai} />
            <Route path="/shepherd" component={Shepherd} />
         </Switch>
      </animated.div>
   )
}
