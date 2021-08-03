import Home from 'pages/home/home'
import Login from 'pages/login/login'
import React from 'react'
import { Switch, Route, useLocation } from 'react-router-dom'
import { useTransition } from 'react-spring'

export default function Router() {
   const location = useLocation()

   // const routesTransition = useTransition()

   return (
      <Switch>
         <Route exact path="/" component={Home} />
         <Route path="/login" component={Login} />
      </Switch>
   )
}
