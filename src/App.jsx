import React from 'react'
import Landingpage from './vendorDashboard/pages/Landingpage'
import './App.css'
import { Routes,Route } from 'react-router-dom'
import Notfound from './vendorDashboard/components/Notfound'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/'  element={<Landingpage/>}  />
        <Route path='/*'  element={<Notfound/>}  />
      </Routes>
     
    </div>
  )
}

export default App
