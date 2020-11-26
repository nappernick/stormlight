import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import * as sessionActions from "./store/session"
import { load } from "./store/isLoaded"
import LoginFormPage from './components/LoginFormPage/LoginFormPage';
import SignupFormPage from './components/SignupFormPage/SignupFormPage';
import Navigation from './components/Navigation/Navigation';
import DashboardPage from './components/Dashboard/DashboardPage';
import { initializeStock } from './store/stocks';
import { initializeIntraDay } from './store/intraday';

function App() {
  const dispatch = useDispatch()
  const history = useHistory()
  const loaded = useSelector(state => state.loaded.loaded)
  const sessionUser = useSelector(state => state.session.user)
  const [authLocation, setAuthLocation] = useState("login")

  useEffect(() => {
    dispatch(sessionActions.restore())
      .then(() => dispatch(load()));
  }, [dispatch])
  useEffect(() => {
    if (sessionUser) {
      dispatch(initializeStock(sessionUser.id))
      dispatch(initializeIntraDay(sessionUser.id))
    }
  }, [sessionUser])

  if (!sessionUser && loaded) {
    history.push('/login')
  } else {
    history.push('/dashboard')
  }

  if (!loaded) return null
  return (
    <>
      <Navigation authLocation={authLocation} setAuthLocation={setAuthLocation} />
      <Switch>
        {/* <Route path="/" component={App} /> */}
        <Route path="/login" component={
          authLocation === "login" ?
            LoginFormPage :
            SignupFormPage
        } />
        {/* <Route path="/signup" component={SignupFormPage} /> */}
        <Route path="/dashboard" component={DashboardPage} />
      </Switch>
    </>
  )
}

export default App;
