import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { NotFound, Protected, UnAuthor } from './Common';
import { Signup, Login } from './User';
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faChevronRight, faDoorOpen, faTabletAlt,
  faTags, faTimes, faCheck, faBolt, faCloud,
  faCloudRain, faCloudSun, faTint, faSmog,
  faSnowflake, faWind, faComment
} from '@fortawesome/free-solid-svg-icons'

import Main from './Main'
import Netflix from './Netflix';
import Weather from './Weather';
import { CreateExp, Expense, UpdateExp } from './Expense';
import { ChatRoom, Join } from './Chat';

library.add(
  faChevronRight, faDoorOpen, faTabletAlt, faTags, faTimes,
  faCheck, faBolt, faCloud, faCloudRain, faCloudSun, faTint,
  faSmog, faSnowflake, faWind, faComment
)

function App() {
  return (
    <Switch>
      {/* user */}
      <Route exact path='/signup' component={Signup} />
      <Route exact path='/login' component={Login} />

      {/* main page */}
      <Route exact path='/' component={Main} />

      {/* netflix */}
      <Route exact path='/netflix' component={Netflix} />

      {/* weather */}
      <Route exact path='/weather' component={Weather} />

      {/* expenses */}
      <Protected exact path='/expense' component={Expense} />
      <Protected exact path='/create-exp' component={CreateExp} />
      <Protected exact path='/update-exp' component={UpdateExp} />

      {/* chats */}
      <Route exact path='/join-in-chat' component={Join} />
      <Route exact path='/chat/:name/:room' component={ChatRoom} />

      {/* additional */}
      <Route exact path="/unauth" component={UnAuthor} />
      <Route path="*" component={NotFound} />
    </Switch>
  );
}

export default App;
