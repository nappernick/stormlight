import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import * as sessionActions from "./store/session"
import LoginFormPage from './components/LoginFormPage/LoginFormPage';
import SignupFormPage from './components/SignupFormPage/SignupFormPage';
import Navigation from './components/Navigation/Navigation';



function App() {
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false)
  useEffect(() => {
    dispatch(sessionActions.restore()).then(() => setIsLoaded(true))
  }, [dispatch])
  const sessionUser = useSelector(state => state.session.user)

  if (!sessionUser) return <Redirect to="signup" />
  
  return (
    <>
      <Navigation isLoaded={isLoaded} />
      { isLoaded && (
        <Switch>
          <Route path="/login" component={LoginFormPage} />
          <Route path="/signup" component={SignupFormPage} />
        </Switch>
      )}
    </>
  )
}

export default App;
