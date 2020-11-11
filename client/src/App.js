import React, { useContext } from 'react';
import './App.css';
import { AuthContext, AuthProvider } from './context/AuthContext';
import { AxiosProvider } from './context/AxiosContext';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import Login from './Components/Login';
import Public from './Components/Public';
import Private from './Components/Private'

const AuthenticatedRoute = ({ children }) => {
  const authContext = useContext(AuthContext);
  if (!authContext.isAuthenticated()) {
    return <Redirect to={'/login'} />;
  }
  return children;
}

const Routes = () => {
  return (
    <Switch>
      <Route exact path='/'>
        <Public />
      </Route>
      <Route exact path='/login'>
        <Login />
      </Route>
      <Route exact path='/private'>
        <Private />
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AxiosProvider>
          <Routes />
        </AxiosProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
