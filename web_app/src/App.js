import './App.css';
import React, { useState } from 'react';
import Landing from './components/Landing/Landing';

const App = props => {
  const [authenticated, setAuthenticated] = useState(false);

  let content =  <Landing />

  if (authenticated) {

  }

  return content;
}

export default App;