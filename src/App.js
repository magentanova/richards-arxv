import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom'

import Player from './components/Player';
import ArchivePage from './components/ArchivePage';
import UploadPage from './components/UploadPage';

import './App.css';

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route path='/player/:collectionId/:index' component={Player}></Route>
        <Route path='/upload' component={UploadPage}></Route>
        <Route exact path='/' component={ArchivePage}></Route>
      </Switch>
    </HashRouter>
  );
}

export default App;
