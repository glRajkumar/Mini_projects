import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import { AuthContext } from './Components/State/Auth/AuthContextProvider'
import { NotFound, Protected, UnAuthor } from './Components/Common'
import { Signup, Login } from './Components/User'
import { Expense } from './Components/Expense'
import './CSS/app.css'

const App = () => {
  const { auth } = useContext(AuthContext)
  
  return (
    <div id="app">
      <Switch>
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/login' component={Login} />
        <Protected exact path='/' auth={auth} component={Expense} />
        <Route exact path="/unauth" component={UnAuthor} />
        <Route path="*" component={NotFound} />
      </Switch>
    </div>
  );
}

export default App