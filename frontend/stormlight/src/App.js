import React, { useEffect, useState } from 'react';
import { Route, Switch } from "react-router-dom"
import { useDispatch } from "react-redux"
import * as sessionActions from "./store/session"
import LoginFormPage from './components/LoginFormPage/LoginFormPage';
import SignupFormPage from './components/SignupFormPage/SignupFormPage';



function App() {
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false)
  useEffect(() => {
    dispatch(sessionActions.restore()).then(() => setIsLoaded(true))
  }, [dispatch])

  if (isLoaded) return (
    <Switch>
      <Route path="/login" component={LoginFormPage} />
      <Route path="/signup" component={SignupFormPage} />
    </Switch>
  )
  else return false;
}

export default App;
