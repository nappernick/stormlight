import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import * as sessionActions from "./store/session"
import LoginFormPage from './components/LoginFormPage/LoginFormPage';
import SignupFormPage from './components/SignupFormPage/SignupFormPage';
import Navigation from './components/Navigation/Navigation';



function App() {
  const dispatch = useDispatch()
  const history = useHistory()
  const [isLoaded, setIsLoaded] = useState(false)
  const sessionUser = useSelector(state => state.session.user)

  useEffect(() => {
    dispatch(sessionActions.restore()).then(() => setIsLoaded(true))
  }, [dispatch])

  if (!sessionUser && isLoaded) {
    history.push('/login')
  } else {
    <Redirect to="/dashboard" />
  }


  return (
    <>
      <Navigation isLoaded={isLoaded} />
      { isLoaded && (
        <Switch>
          {/* <Route exact path="/" component={App} /> */}
          <Route exact path="/login" component={LoginFormPage} />
          <Route exact path="/signup" component={SignupFormPage} />
        </Switch>
      )}
    </>
  )
}

export default App;
