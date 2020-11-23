import React, { useEffect } from 'react';
import { Redirect, Route, Switch, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import * as sessionActions from "./store/session"
import { load } from "./store/isLoaded"
import LoginFormPage from './components/LoginFormPage/LoginFormPage';
import SignupFormPage from './components/SignupFormPage/SignupFormPage';
import Navigation from './components/Navigation/Navigation';
import DashboardPage from './components/Dashboard/DashboardPage';



function App() {
  const dispatch = useDispatch()
  const history = useHistory()
  const loaded = useSelector(state => state.loaded.loaded)
  const sessionUser = useSelector(state => state.session.user)

  useEffect(() => {
    dispatch(sessionActions.restore())
      .then(() => dispatch(load()))
  }, [dispatch])

  if (!sessionUser && loaded) {
    history.push('/login')
  } else {
    <Redirect to="/dashboard" />
  }


  return (
    <>
      <Navigation />
      { loaded && (
        <Switch>
          {/* <Route path="/" component={App} /> */}
          <Route path="/login" component={LoginFormPage} />
          <Route path="/signup" component={SignupFormPage} />
          <Route path="/dashboard" component={DashboardPage} />
        </Switch>
      )}
    </>
  )
}

export default App;
