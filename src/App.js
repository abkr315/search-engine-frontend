import React from 'react'
import './App.css'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Navbar from './layout/Navbar'
import Index from './layout/Index'

function App() {
  return (
    <Router>
    <>
     <Navbar />
      <Switch>
        <Route exact path="/" component={Index} />
      </Switch>
    </>
    </Router>
  );
}

export default App;
