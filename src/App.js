import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom'

import PlayerPage from './components/PlayerPage';
import ArchivePage from './components/ArchivePage';
import UploadPage from './components/UploadPage';

import './App.css';

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route path='/view/:year/:category/:type/:order' component={PlayerPage}></Route>
        <Route path='/upload' component={UploadPage}></Route>
        <Route exact path='/' component={ArchivePage}></Route>
      </Switch>
    </HashRouter>
  );
}

export default App;
