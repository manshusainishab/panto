import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Repos from './Repos';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/repos" element={<Repos />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </Router>
);

const Login = () => (
  <div style={{ textAlign: 'center', marginTop: '50px' }}>
    <h1>Login with GitHub</h1>
    <a href="https://panto.onrender.com/auth/github">
      <button>Login</button>
    </a>
  </div>
);

export default App;
