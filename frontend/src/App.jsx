import React from 'react'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import Doctors from './pages/Doctors'

const App = () => {
  return (
    <div>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path='/doctors' element={<Doctors />} />
    </Routes>
  
    </div>
  )
}

export default App
