import React, { useState, useEffect } from 'react'
import { Routes, Route, Outlet, useLocation } from 'react-router-dom'
import Activities from './components/Activities'
import Footer from './components/Footer'
import Gallery from './components/Gallery'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import TopBar from './components/topBar'
import RegisterForm from './components/RegisterForm'
import ServicesComponent from './components/Services'

function App() {
  const [isLoginPage, setIsLoginPage] = useState(false)
  const location = useLocation()

  const handleLoginClick = () => {
    setIsLoginPage(true)
  }

  const handleNavigateBack = () => {
    setIsLoginPage(false)
    // You can add any additional logic here
  }

  useEffect(() => {
    // Reset isLoginPage when component mounts
    setIsLoginPage(location.pathname === '/register')
  }, [location.pathname])

  return (
    <div>
      <Navbar />
      <TopBar />
      <Routes>
        <Route
          path='/'
          element={
            <>
              {!isLoginPage && (
                <>
                  <Hero />
                  <Activities onLoginClick={handleLoginClick} />
                  <Gallery />
                  <Footer />
                </>
              )}
              <Outlet />
            </>
          }
        />
        <Route
          path='/register'
          element={<RegisterForm setIsLoginPage={handleNavigateBack} />}
        />
        {/* Add the route for "/services" */}
        <Route path='/Services' element={<ServicesComponent />} />
        {/* ... add more routes as needed ... */}
      </Routes>
    </div>
  )
}

export default App
