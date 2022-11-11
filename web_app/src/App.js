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

const App = props => {
  useConstructor(() => {
    console.log("[App Component Before Mount]");
  });
  const [loading, setLoading] = useState(true);

  //decontruct action so we can check if it changes
  const {onAutoSignIn} = props;
  //componentDidMount
  useEffect(() => {
      onAutoSignIn();
      console.log('[APP ComponentDidMount');
      setLoading(false);
  }, [onAutoSignIn]);

  let content = null;
  if (!loading) {
    content =  (
      <Routes>
        <Route path='/signin' element={<Auth />} />
        {/* <Route index element={<Landing />} /> */}
        <Route path='/' exact element={<Landing />} />
        <Route path="/*" element={<Navigate to="/"/>} />
      </Routes>
    );
  
    if (props.isLoggedIn) {
      content =  (
        <Routes>
          <Route path='/base' exact element={<Base />} />
          <Route path='/*' element={<Navigate to='/base'/>} />
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