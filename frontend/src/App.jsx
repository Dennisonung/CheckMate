import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react'
import ReactDOM from 'react-dom/client'
import './App.css'
import Home from './files/Home'
import Groups from './files/Groups'
import Billing from './files/Billing'

function App() {
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/groups" element={<Groups />} />
      <Route path='/billing' element={<Billing />} />
    </Routes>
  </BrowserRouter>
}

export default App