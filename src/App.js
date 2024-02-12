import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Activities from './components/Activities'
import Footer from './components/Footer'
import Gallery from './components/Gallery'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import TopBar from './components/topBar'
import ServicesComponent from './components/Services'
import ProductsPage from './components/ProductsPage'
import Newsection from './components/Newsection'

function App() {
  return (
    <div>
      <Navbar />
      <TopBar />
      <Routes>
        <Route
          path='/'
          element={
            <>
              <Hero />
              <Activities />
              <Newsection />
              <Gallery />
              <Footer />
            </>
          }
        />
        <Route path='/Services' element={<ServicesComponent />} />
        <Route path='/products' element={<ProductsPage />} />
      </Routes>
    </div>
  )
}

export default App
