import React from 'react';
import './App.css';
import Nav from './Nav';
import TabNav from './TabNav';
import Footer from './Footer';
import {library} from '@fortawesome/fontawesome-svg-core'
import {faChevronRight, faDoorOpen, faTabletAlt, faTags, faTimes, faCheck} from '@fortawesome/free-solid-svg-icons'

library.add(faChevronRight, faDoorOpen, faTabletAlt, faTags, faTimes, faCheck)

function App() {
  return (
    <>
      <Nav />
      <TabNav />
      <Footer />
    </>
  );
}

export default App;
