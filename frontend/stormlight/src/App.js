import React, { useEffect, useState } from 'react';
import { Route, Switch } from "react-router-dom"
import { useDispatch } from "react-redux"
import * as sessionActions from "./store/session"
import LoginFormPage from './components/LoginFormPage';



function App() {
  const dispatch = useDispatch()
  const [loggedIn, setLoggedIn] = useState(false)
  useEffect(() => {
    dispatch(sessionActions.restore()).then(() => setLoggedIn(true))
  }, [dispatch])

  if (loggedIn) return (
    <Switch>
      <Route path="/login" component={LoginFormPage} />
    </Switch>
  )
  else return ''
}

export default App;
