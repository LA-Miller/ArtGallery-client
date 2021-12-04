import React, { useState, useEffect } from 'react';
import Auth from './auth/Auth';
import Sitebar from './home/Navbar'
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import PostCreate from './posts/PostCreate';

function App() {
  const [ sessionToken, setSessionToken ] = useState('');

  useEffect(() => {
    setSessionToken(localStorage.getItem('token'));
  }, [])

  const updateToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
  }

  const clearToken = () => {
    localStorage.clear();
    setSessionToken('');
  }

  // const protectedViews = () => {
  //   return (sessionToken === localStorage.getItem('token') ? <WorkoutIndex token={sessionToken} /> : <Auth updateToken={updateToken}/>)
  // }

  return (
    <div className="App">
    
      <Sitebar clickLogout={clearToken}/>
      <PostCreate/>
    
    </div>
  );
}



export default App;
