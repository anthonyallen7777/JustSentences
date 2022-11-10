import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router';

import Landing from './components/Landing/Landing';
import Auth from './components/Auth/Auth';

const App = props => {
  let content =  (
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/signin' element={<Auth />} />
    </Routes>
  );

  return (
    <div>
      {content}
    </div>
  );
}

export default App;