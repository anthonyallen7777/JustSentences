import './App.css';
import React, { Suspense, useEffect, useContext, useState } from 'react';
import { Routes, Route } from 'react-router';
import { Navigate } from 'react-router-dom';

import useConstructor from './hooks/constructor-hook';

//redux
import { connect } from 'react-redux';
import * as actions from './store/actions/index';

import Landing from './components/Landing/Landing';
const Auth = React.lazy(() => import('./components/Auth/Auth'));
const Base = React.lazy(() => import('./components/Base/Base'));
const Practice = React.lazy(() => import('./components/Base/Practice/Practice'));
const Progress = React.lazy(() => import('./components/Base/Progress/Progress'));
const Languages = React.lazy(() => import('./components/Base/Languages/Languages'));
const Profile = React.lazy(() => import('./components/Base/Profile/Profile'));
const Settings = React.lazy(() => import('./components/Base/Profile/Settings/Settings'));

const App = props => {
  const [loading, setLoading] = useState(true);
  //decontruct action so we can check if it changes
  const {onAutoSignIn} = props;
  useEffect(() => {
      onAutoSignIn();
      setLoading(false);
  }, [onAutoSignIn]);

  let content = null;
  if (!loading) {
    content =  (
      <Routes>
        <Route path='/signin' element={<Auth />} />
        <Route path='/' exact element={<Landing />} />
        <Route path="/*" element={<Navigate to="/"/>} />
      </Routes>
    );
  
    if (props.isLoggedIn) {
      content =  (
        <Routes>
          <Route path='/profile/settings' exact element={<Settings />} />
          <Route path='/profile' exact element={<Profile />} />
          <Route path='/languages' exact element={<Languages />} />
          <Route path='/progress' exact element={<Progress />} />
          <Route path='/practice' exact element={<Practice />} />
          <Route path='/' exact element={<Base />} />
          <Route path='/*' element={<Navigate to='/'/>} />
        </Routes>
      );
    }
  }

  return (
    <div>
      <Suspense fallback={<p>Loading...</p>}>
        {content}
      </Suspense>
    </div>
  );
}

const mapStateToProps = state => {
  return {
      isLoggedIn: state.authenticate.idToken !== null,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onAutoSignIn: () => dispatch(actions.authStateCheck())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);