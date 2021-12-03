import React, { useState, useEffect } from 'react';
import Auth from './auth/Auth';
import Sitebar from './home/Navbar'
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import PostCreate from './posts/PostCreate';

function App() {
  return (
    <div className="App">
      <Sitebar />
      <PostCreate/>
    </div>
  );
}



export default App;
