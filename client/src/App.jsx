import React from 'react'
import './App.css'
import {BrowserRouter,Routes, Route } from 'react-router-dom';
import Student from './components/Student/Student';

function App() {

  return (
    <>
    <BrowserRouter>
     <Routes>
      <Route path='/' element= {<Student/>}/>
     </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

