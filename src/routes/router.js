import Login from 'pages/login/login'
import React from 'react'
import {Switch, Route} from 'react-router-dom'

export default function Router() {
   return (
      <Switch>
         <Route exact path="/" component={Login} />
      </Switch>
   )
}
