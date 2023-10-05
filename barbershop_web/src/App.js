import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Activities from "./components/Activities";
import Footer from "./components/Footer";
import Gallery from "./components/Gallery";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import TopBar from "./components/topBar";

import RegisterForm from "./components/RegisterForm";

function App() {
  // Add state to manage whether the user is on the login page
  const [isLoginPage, setIsLoginPage] = useState(false);

  // Function to set isLoginPage to true when the user clicks the "Logheaza-te" link
  const handleLoginClick = () => {
    setIsLoginPage(true);
  };

  // Function to set isLoginPage to false when the user navigates away from the login page
  const handleNavigateAway = () => {
    setIsLoginPage(false);
  };

  return (
    <Router>
      <div>
        <Navbar />
        <TopBar />
        <Routes>
          {/* Placeholder for the root URL */}
          <Route path="/" element={<div />} />
          {/* Route for the login page */}
          <Route
            path="/register"
            element={<RegisterForm setIsLoginPage={handleNavigateAway} />}
          />
        </Routes>
        {/* Conditionally render content based on isLoginPage */}
        {!isLoginPage && (
          <>
            <Hero />
            <Activities onLoginClick={handleLoginClick} />
            <Gallery />
            <Footer />
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
