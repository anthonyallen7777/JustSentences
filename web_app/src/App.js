import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router';

import Landing from './components/Landing/Landing';
import Auth from './components/Auth/Auth';
import Base from './components/Base/Base';

//redux
import { connect } from 'react-redux';
import * as actions from './store/actions/index';

const App = props => {
  let content =  (
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/signin' element={<Auth />} />
    </Routes>
  );

  if (props.isAuthenticated) {
    content =  (
      <Routes>
        <Route path='/' element={<Base />} />
        <Route path='/signin' element={<Auth />} />
      </Routes>
    );
  }

  return (
    <div>
      {content}
    </div>
  );
}

const mapStateToProps = state => {
  return {
      isAuthenticated: state.authenticate.idToken !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuthStateCheck: () => dispatch(actions)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);