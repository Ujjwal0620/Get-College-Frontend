import React from 'react'
import {Routes, Route} from 'react-router-dom' 
import NavBar from './components/NavBar'
import HomePage from './pages/HomePage'
import Login from './components/Login'
import Signup from './components/Signup'
import Profile from './pages/Profile'
import ProtectedRoute from './components/ProtectedRoute'
import CollegeDetail from './pages/CollegeDetail'
import ExamsPage from './pages/ExamsPage'
import ExamDetailPage from './pages/ExamDetailPage'

const App = () => {
  return (
    <div>
      <NavBar/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path='/collegedetails' element={<CollegeDetail/>}/>
          <Route path="/exams" element={<ExamsPage />} />
        <Route path="/exams/:slug" element={<ExamDetailPage />} />
      </Routes>
    </div>
  )
}

export default App
