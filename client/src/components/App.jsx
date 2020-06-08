import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Home from './Home/Home.jsx';
import Shipments from './Shipments/Shipments.jsx';
import CarpetManifest from './CarpetManifest/CarpetManifest.jsx';

const App = () => (
  <Router>
    <Switch>
      <Route path="/shipments/:shipmentId/carpet">
        <CarpetManifest />
      </Route>
      <Route path="/shipments">
        <Shipments />
      </Route>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="*">
        <Redirect to="/" />
      </Route>
    </Switch>
  </Router>
);

export default App;
