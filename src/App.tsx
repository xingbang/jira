import React from 'react'
import { Redirect, Route, Switch, withRouter } from 'react-router-dom'
import { Login } from './pages'
import LayoutDefault from './layout'

import './App.less'
    
const App = () => {
  return (
      <Switch>
        <Route path='/login' component={Login} />
        <Route component={LayoutDefault} />
        <Redirect from="/" to="/List" />
      </Switch>
  )
}

export default withRouter(App)
