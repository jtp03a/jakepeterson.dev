import React, { useContext } from 'react';
import './App.scss';
import { AuthContext, AuthProvider } from './context/AuthContext';
import { AxiosProvider } from './context/AxiosContext';
import { HomeContext, HomeProvider } from './context/HomeContext'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Login from './Components/Login';
import Home from './Components/Home';
import Private from './Components/Private';
import Navbar from './Components/Navbar';
import Post from './Components/Post';

const AuthenticatedRoute = ({ children }) => {
  const authContext = useContext(AuthContext);
  if (!authContext.isAuthenticated()) {
    return <Redirect to={'/login'} />;
  }
  return children;
}

const Routes = () => {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/posts/:postID'>
          <Post />
        </Route>
        <Route exact path='/login'>
          <Login />
        </Route>
        <AuthenticatedRoute exact path='/private'>
          <Private />
        </AuthenticatedRoute>
      </Switch>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AxiosProvider>
          <HomeProvider>
            <Routes />
          </HomeProvider>
        </AxiosProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
