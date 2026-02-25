import React from 'react'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import Doctors from './pages/Doctors'
import DoctorDetail from './pages/DoctorDetail'
import Service from './pages/Service'
import ServiceDetailPage from './pages/ServiceDetailPage'
import Contact from './pages/Contact'
import Login from './pages/Login'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:id' element={<DoctorDetail />} />
        <Route path='/services' element={<Service />} />
       <Route path='/contact' element={<Contact />} />
       
       <Route path='/doctor-admin/login' element={<Login/>}/>
     
      </Routes>

    </div>
  )
}

export default App
