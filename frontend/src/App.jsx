import { useState, useContext } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react'
import ReactDOM from 'react-dom/client'
import './App.css'
import Home from './files/home.jsx'
import Groups from './files/groups.jsx'
import Billing from './files/billing'
import { GroupContext } from './contexts/GroupContext';

function App() {
  const [value, setValue] = useState('');

  return <BrowserRouter>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/groups" element={<Groups/>} />
        <Route path='/billing' element={<Billing/>} />
    </Routes>
  </BrowserRouter>
}

export default App
