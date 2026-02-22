import React from 'react'
import Navbar from '../components/Navbar'
import Banner from '../components/Banner'
import Certification from '../components/Certification'
import HomeDoctors from '../components/HomeDoctors'

export default function Home() {
  return (
    <div>
      <Navbar/>
      <Banner/>
      <Certification/>
      <HomeDoctors/>
    </div>
  )
}
