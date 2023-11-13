import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import Welcome from './components/Welcome'

function App() {
  const [isLoggedin,setIsLoggedin] = useState(false)

  return (
    <React.Fragment>
      <header>
        <Header isLoggedin={isLoggedin} setIsLoggedin={setIsLoggedin} />
      </header>
      <main>
        <Routes>
          <Route
            path="login"
            element={
              <Login isLoggedin={isLoggedin} setIsLoggedin={setIsLoggedin} />
            }
          />
          <Route path="signup" element={<Signup />} />
          {isLoggedin && <Route path="user" element={<Welcome />} />}
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App
