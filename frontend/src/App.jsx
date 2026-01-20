import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Login from './pages/Login'
import TeacherDashboard from './pages/TeacherDashboard';
import StudentDashboard from './pages/StudentDashboard';
import Unauthorized from './pages/Unauthorized';
import ProtectedRoutes from './routes/ProtectedRoutes';

function App() {
  

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/teacher' element={
          <ProtectedRoutes allowedRole='teacher'>
            <TeacherDashboard/>
          </ProtectedRoutes>
        }/>
        <Route path='/student' element={
          <ProtectedRoutes allowedRole='student'>
            <StudentDashboard/>
          </ProtectedRoutes>
        }/>
        <Route path='unauthorized' element={<Unauthorized/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
