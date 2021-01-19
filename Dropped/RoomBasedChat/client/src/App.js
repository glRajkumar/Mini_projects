import React from 'react';
import Join from './component/Join';
import Chat from './component/Chat';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './css/reset.css'
import './css/common.css'

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={Join} />
      <Route path="/chat/:user_name/:user_room" component={Chat} />
    </Router>
  );
}

export default App;